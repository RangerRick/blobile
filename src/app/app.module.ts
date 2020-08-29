import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { AlertController, IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { Deploy } from 'cordova-plugin-ionic/dist/ngx';
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
  constructor(private alertController: AlertController, private deploy: Deploy) {
  }

  async doUpdate() {
    try {
      const currentVersion = await this.deploy.getCurrentVersion();
      const resp = await this.deploy.sync({updateMethod: 'background'}, percentDone => {
        console.debug(`Update is ${percentDone}% done!`);
      });
      if (!currentVersion || currentVersion.versionId !== resp.versionId) {
        // We found an update, as if they want to update!
        const alert = await this.alertController.create({
          // cssClass: 'my-custom-class',
          header: 'Update Available',
          // subHeader: 'Subtitle',
          message: 'An update is available. Apply now?',
          buttons: [
            {
              text: 'Skip',
              role: 'cancel',
              cssClass: 'secondary',
            },
            {
              text: 'Apply',
              handler: () => {
                this.deploy.reloadApp();
              }
            }
          ]
        });
        await alert.present();
      } else {
        // No update available
      }
    } catch (err) {
      console.error('Something went wrong attempting to update:', err);
    }
  }
}
