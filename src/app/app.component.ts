import { Component } from '@angular/core';

import { AlertController, Platform } from '@ionic/angular';

import { Deploy } from 'cordova-plugin-ionic/dist/ngx';
import { Plugins } from '@capacitor/core';
const { SplashScreen } = Plugins;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public updateAvailable = false;

  constructor(
    private alertController: AlertController,
    private deploy: Deploy,
    private platform: Platform,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(async () => {
      SplashScreen.hide();
      this.checkUpdate();
      return true;
    });
  }

  async triggerUpdate() {
    console.debug('AppComponent.triggerUpdate()');

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
            console.debug('AppComponent.triggerUpdate(): skipping reload');
            return true;
          }
        },
        {
          text: 'Apply',
          handler: async () => {
            console.debug('AppComponent.triggerUpdate(): reloading app');
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
      console.info(`AppComponent.checkUpdate(): current=${currentVersion ? currentVersion.versionId : 'unknown'}`);
      const update = await this.deploy.sync({updateMethod: 'background'}, percentDone => {
        console.debug(`AppComponent.checkUpdate(): ${percentDone}% done`);
      });
      console.info(`AppComponent.checkUpdate(): update=${update ? update.versionId : 'unknown'}`);
      this.updateAvailable = ! currentVersion || currentVersion.versionId !== update.versionId;
      return true;
    } catch (err) {
      console.error(`AppComponent.checkUpdate(): something went wrong attempting to update: ${err.message? err.message : 'unknown'}`);
      return false;
    }
  }
}
