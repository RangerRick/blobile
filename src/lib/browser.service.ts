import '@capacitor-community/http';

import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';

import { DeviceInfo, Plugins } from '@capacitor/core';
import { SettingsService } from './settings.service';
const { Device } = Plugins;

import { InAppBrowser, InAppBrowserObject } from '@ionic-native/in-app-browser/ngx';

@Injectable({
  providedIn: 'root'
})
export class BrowserService {
  deviceInfo: DeviceInfo;
  browser: InAppBrowserObject;

  constructor(
    private iab: InAppBrowser,
    private platform: Platform,
    public settings: SettingsService,
  ) {
    this.init();
  }

  async init() {
    try {
      console.debug('BrowserService.init()');
      await this.platform.ready();

      await this.settings.ready;
      this.deviceInfo = await Device.getInfo();
      console.debug('BrowserService.init(): device info=', this.deviceInfo);

    } catch (err) {
      console.error('Failed to initialize.', err);
    }
  }

  showBlaseballTab() {
    return this.deviceInfo?.platform !== 'web';
  }

  async openBlaseball(ev: Event) {
    if (ev) {
      ev.stopPropagation();
      ev.preventDefault();
    }

    this.browser?.close();

    this.browser = this.iab.create(
      this.settings.blaseballUrl() || 'https://www.blaseball.com/',
      'blaseball',
      {
        location: 'no',
        closebuttoncolor: '#00a831',
        footer: 'yes',
        footercolor: '#00a831',
        navigationbuttoncolor: '#00a831',
        toolbarcolor: '#00a831',
        shouldPauseOnSuspend: 'yes',
      },
    );
    this.browser.on('loadstop').subscribe(ev => {
      console.debug('BrowserService.openBlaseball(): navigated to:', ev?.url);
      this.settings.setBlaseballUrl(ev?.url);
    });
  }
}
