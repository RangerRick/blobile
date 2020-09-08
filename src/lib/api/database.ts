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

  private async get(url: string, force?: boolean) {
    if (!force && this.cache[url]) {
      return this.cache[url];
    }

    const { Http } = Plugins;
    const ret = (await Http.request({
      method: 'GET',
      url: url,
    })) as HttpResponse;
    this.cache[url] = ret.data;
    return ret.data;
  }

  public async teams(force?: boolean) {
    const url = `${this.root}/allTeams`;
    console.debug(`APIDatabase.teams(): GET ${url}`);
    try {
      return (await this.get(url, force)) as Team[];
    } catch (err) {
      console.error('APIDatabase.teams(): failed to get list of teams', err);
      return [];
    }
  }
}