import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';

import { Plugins } from '@capacitor/core';
const { SplashScreen } = Plugins;

import { UpdateService } from '../lib/update.service';
import { RouteWatcherService } from './route-watcher';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private updateService: UpdateService,
    private platform: Platform,
    private router: Router,
    private routeWatcherService: RouteWatcherService,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(async () => {
      const url = await this.routeWatcherService.lastUrl();
      try {
        if (url) {
          await this.router.navigateByUrl(url);
        }
      } catch (err) {
        console.error(`AppComponent.initializeApp(): failed to navigate to ${url}`);
      }

      try {
        await this.updateService.checkUpdate();
      } catch (err) {
        console.error('AppComponent.initializeApp(): failed to check for updates.', err);
      }

      SplashScreen.hide();
      return true;
    });
  }

}
