import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';

import { Plugins } from '@capacitor/core';
const { SplashScreen } = Plugins;

import { UpdateService } from '../lib/update.service';
import { RouteWatcherService } from './route-watcher';
import { Router } from '@angular/router';
import { APIStream } from 'src/lib/api/stream';

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
    private stream: APIStream,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(async () => {
      console.debug('AppComponent.initializeApp(): starting stream');
      const observable = await this.stream.start();
      const subscription = observable.subscribe((evt: any) => {
        // once we get a real message, hide the splash screen
        SplashScreen.hide();
        subscription.unsubscribe();
      }, (err: any) => {
        // even if we get an error, hide the splash screen
        SplashScreen.hide();
        subscription.unsubscribe();
      });

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

      return true;
    });
  }

}
