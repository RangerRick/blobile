import { Injectable } from '@angular/core';

import { AlertController } from '@ionic/angular';

import { Deploy } from 'cordova-plugin-ionic/dist/ngx';

@Injectable({
  providedIn: 'root'
})
export class UpdateService {
  public updateAvailable = true;

  constructor(
    private alertController: AlertController,
    private deploy: Deploy
  ) {
  }

  async triggerUpdate() {
    console.debug('UpdateService.triggerUpdate()');

    const alert = await this.alertController.create({
      // cssClass: 'my-custom-class',
      header: 'Update Available',
      // subHeader: 'Subtitle',
      message: 'An update is available. Apply now?',
      buttons: [
        {
          text: 'Not Now',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.debug('UpdateService.triggerUpdate(): skipping reload');
            return true;
          }
        },
        {
          text: 'Apply',
          handler: async () => {
            console.debug('UpdateService.triggerUpdate(): reloading app');
            return this.deploy.reloadApp();
          }
        }
      ]
    });
    await alert.present();
  }

  async checkUpdate() {
    try {
      const currentVersion = await this.deploy.getCurrentVersion();
      console.info(`UpdateService.checkUpdate(): current=${currentVersion ? currentVersion.versionId : 'unknown'}`);
      const update = await this.deploy.sync({updateMethod: 'background'}, percentDone => {
        console.debug(`UpdateService.checkUpdate(): ${percentDone}% done`);
      });
      console.info(`UpdateService.checkUpdate(): update=${update ? update.versionId : 'unknown'}`);
      this.updateAvailable = ! currentVersion || currentVersion.versionId !== update.versionId;
      return true;
    } catch (err) {
      console.error(`UpdateService.checkUpdate(): something went wrong attempting to update: ${err.message? err.message : 'unknown'}`);
      return false;
    }
  }
}
