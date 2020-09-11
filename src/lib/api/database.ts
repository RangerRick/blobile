import { Injectable } from '@angular/core';

import { Plugins, DeviceInfo } from '@capacitor/core';

import '@capacitor-community/http';
import { HttpResponse } from '@capacitor-community/http';

import { Team } from '../model/team';
import { Player } from '../model/player';

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

    const ret = await Http.request({
      method: 'GET',
      url: url,
    }).catch((err:any) => {
      console.error('request failed, trying again in 1s:', err);
      return new Promise((resolve, reject) => {
        setTimeout(async () => {
          try {
            const response = await Http.request({
              method: 'GET',
              url: url,
            }) as HttpResponse;
            resolve(response);
          }  catch(err) {
            reject(err);
          }
        }, 1000);
      });
    });
    this.cache[url] = (ret as any).data;
    // console.debug('data=', ret.data);
    return (ret as any).data;
  }

  public async teams(force?: boolean): Promise<Team[]> {
    const url = `${this.root}/allTeams`;
    console.debug(`APIDatabase.teams(): GET ${url}`);
    try {
      const ret = await this.get(url, force);
      if (ret) {
        return ret.map((team:any) => new Team(team));
      }
    } catch (err) {
      console.error('APIDatabase.teams(): failed to get list of teams', err);
    }
    return [];
  }

  public async players(...args: any[]): Promise<Player[]> {
    let force = false;
    if (typeof args[args.length-1] === 'boolean') {
      force = args.pop();
    }
    if (args.length === 0) {
      return [] as Player[];
    }
    const url = `${this.root}/players?ids=${args.join(',')}`;
    console.debug(`APIDatabase.players(): GET ${url}`);
    try {
      const ret = await this.get(url, force);
      if (ret) {
        return ret.map((player:any) => new Player(player));
      }
    } catch (err) {
      console.error('APIDatabase.players(): failed to get players', err);
    }
    return [] as Player[];
  }
}