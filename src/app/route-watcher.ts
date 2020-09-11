import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { filter } from 'rxjs/operators';
import { SettingsService } from 'src/lib/settings.service';

@Injectable({
  providedIn: 'root'
})
export class RouteWatcherService {
  protected routerSubscription: any;

  constructor(
    private router: Router,
    private settings: SettingsService,
  ) {
    this.init();
  }

  async init() {
    await this.settings.ready;
    this.routerSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(async ({urlAfterRedirects}: NavigationEnd) => {
        this.settings.setLastUrl(urlAfterRedirects);
    });
  }

  async lastUrl() {
    await this.settings.ready;
    return this.settings.lastUrl();
  }
}