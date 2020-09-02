import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { AlertController, IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { Deploy } from 'cordova-plugin-ionic/dist/ngx';
import { LoadingController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [
    Deploy,
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private alertController: AlertController, private deploy: Deploy, private loadingController: LoadingController) {
    this.checkUpdate();
  }

  async doUpdate() {
    const loading = await this.loadingController.create({
      message: 'Updating...'
    });
    await loading.present();
    await this.deploy.sync({updateMethod: 'background'}, percentDone => {
      console.debug(`Update is ${percentDone}% done!`);
    }).finally(() => {
      loading.dismiss();
      this.deploy.reloadApp();
    });
  }

  async checkUpdate() {
    try {
      const currentVersion = await this.deploy.getCurrentVersion();
      const update = await this.deploy.checkForUpdate();

      if (update.available) {
        this.doUpdate();
        /*
        // We found an update, as if they want to update!
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
            },
            {
              text: 'Apply',
              handler: () => {
                this.doUpdate();
              }
            }
          ]
        });
        await alert.present();
        */
      }
    } catch (err) {
      console.error('Something went wrong attempting to update:', err);
    }
  }
}
