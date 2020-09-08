import { Injectable } from '@angular/core';

import { Plugins, DeviceInfo } from '@capacitor/core';

import '@capacitor-community/http';
import { HttpResponse } from '@capacitor-community/http';

import { Team } from '../model/team';

@Injectable({
  providedIn: 'root'
})
export class APIDatabase {
  private cache = {} as { [key: string]: any };
  private root = 'https://cors-proxy.blaseball-reference.com/database';

  constructor() {
    Plugins.Device.getInfo().then((info: DeviceInfo) => {
      if (info.platform !== 'web') {
        this.root = 'https://www.blaseball.com/database';
      }
    });
  }

  private async get(cacheKey: string, url: string) {
    if (this.cache[cacheKey]) {
      return this.cache[cacheKey];
    }

    const { Http } = Plugins;
    const ret = (await Http.request({
      method: 'GET',
      url: url,
    })) as HttpResponse;
    return ret.data;
  }

  public async teams() {
    const url = `${this.root}/allTeams`;
    console.debug(`APIDatabase.teams(): GET ${url}`);
    try {
      return (await this.get('teams', url)) as Team[];
    } catch (err) {
      console.error('APIDatabase.teams(): failed to get list of teams', err);
      return [];
    }
  }
}