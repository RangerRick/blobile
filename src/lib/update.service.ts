import '@capacitor-community/http';

import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';

import { Plugins } from '@capacitor/core';
const { Device } = Plugins;

import { Deploy } from 'cordova-plugin-ionic/dist/ngx';
import { ISnapshotInfo } from 'cordova-plugin-ionic/dist/ngx/IonicCordova';

import { VERSION } from '../environments/version';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UpdateService {
  public currentVersion = {
    binary_version: VERSION.version,
    binaryVersion: VERSION.version,
    binaryVersionCode: String(VERSION.build),
    binaryVersionName: VERSION.version,
  } as ISnapshotInfo;
  public newVersion = {} as ISnapshotInfo;
  public updateAvailable = false;
  public updateReady = false;
  public updateError = false;
  public phase: string;
  public percentDone: number;

  constructor(
    private deploy: Deploy,
    private device: Device,
    private platform: Platform,
  ) {
    this.platform.ready().then(async () => {
      try {
        const deviceInfo = await Device.getInfo();
        if (deviceInfo.platform !== 'web') {
          const config = await this.deploy.getConfiguration();
          const betaEnabled = config?.channel?.toLowerCase() === 'beta';
          await this.deploy.configure({
            channel: betaEnabled ? 'Beta' : 'Stable'
          });
        }
      } catch (err) {
        console.error('SettingsService.init(): failed to get configuration', err);
      }
    });
  }

  async reload() {
    console.debug('UpdateService.triggerUpdate()');
    await this.deploy.reloadApp();
  }

  async checkUpdate() {
    if (!environment.production) {
      return false;
    }

    try {
      this.currentVersion = (await this.deploy.getCurrentVersion()) || this.currentVersion;
      console.info('UpdateService.checkUpdate(): currentVersion:', this.currentVersion);

      const update = await this.deploy.checkForUpdate();
      this.updateAvailable = update.available;
      console.debug('UpdateService.checkUpdate(): update info:', update);

      if (this.updateAvailable) {
        try {
          await this.deploy.downloadUpdate((progress: number) => {
            this.phase = 'Downloading';
            this.percentDone = progress / 100.0;
          });

          await this.deploy.extractUpdate((progress: number) => {
            this.phase = 'Extracting';
            this.percentDone = progress / 100.0;
          });

          this.phase = undefined;
          this.updateReady = true;
        } catch (err) {
          this.newVersion = await this.deploy.sync({updateMethod: 'background'}, percentDone => {
            console.debug(`UpdateService.checkUpdate(): ${percentDone}% done`);
            this.percentDone = percentDone / 100.0;
          });

          console.info('UpdateService.checkUpdate(): newVersion:', this.newVersion);
          this.updateAvailable = ! this.currentVersion || this.currentVersion?.versionId !== this.newVersion?.versionId || this.percentDone === 1;
          if (this.updateAvailable) {
            this.updateReady = true;
          }
        }
      }

      return true;
    } catch (err) {
      console.error(`UpdateService.checkUpdate(): something went wrong attempting to update: ${err.message ? err.message : 'unknown'}`);
      this.updateError = true;
      return false;
    }
  }
}
