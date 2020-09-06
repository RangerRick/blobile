import { Component, OnInit } from '@angular/core';

import { Plugins } from '@capacitor/core';
const { Device } = Plugins;

import { Deploy } from 'cordova-plugin-ionic/dist/ngx';

import { UpdateService } from '../../lib/update.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  public betaEnabled = false;
  public platform = 'web';

  constructor(
    public deploy: Deploy,
    public updateService: UpdateService
  ) {
  }

  async ngOnInit() {
    const configuration = await this.deploy.getConfiguration();
    this.betaEnabled = configuration.channel.toLowerCase() === 'beta';

    const info = await Device.getInfo();
    this.platform = info.platform;
  }

  async isBeta() {
    const config = await this.deploy.getConfiguration();
    console.debug(`SettingsPage.isBeta(): channel=${config.channel}`);
    return config.channel.toLowerCase() === 'beta';
  }

  async setBeta() {
    await this.deploy.configure({
      channel: this.betaEnabled ? 'Beta' : 'Stable'
    });
    return await this.isBeta();
  }
}
