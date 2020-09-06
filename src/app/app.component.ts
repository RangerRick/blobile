import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';

import { Plugins } from '@capacitor/core';
const { SplashScreen } = Plugins;

import { UpdateService } from '../lib/update.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private updateService: UpdateService,
    private platform: Platform,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(async () => {
      SplashScreen.hide();
      return this.updateService.checkUpdate().finally(() => {
        return true;
      });
    });
  }

}
