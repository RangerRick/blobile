import { Injectable } from '@angular/core';

import { Plugins, DeviceInfo } from '@capacitor/core';

import '@capacitor-community/http';
import { HttpResponse } from '@capacitor-community/http';

import { Team } from '../model/team';
import { Player } from '../model/player';
import { GlobalEvent } from '../model/globalEvent';

const DEFAULT_CACHE_KEEP = 10 * 60 * 1000; // 10 minutes

interface CacheEntry {
  url: string;
  response: Promise<HttpResponse>;
  time: number;
}

@Injectable({
  providedIn: 'root'
})
export class APIDatabase {
  private cache = {} as { [url: string]: CacheEntry };
  private inFlight = {} as { [url: string]: Promise<HttpResponse> };
  private root = 'https://cors-proxy.blaseball-reference.com/database';

  constructor() {
    Plugins.Device.getInfo().then((info: DeviceInfo) => {
      if (info.platform !== 'web') {
        this.root = 'https://www.blaseball.com/database';
      }
    });
  }

  private async get(url: string, force?: boolean): Promise<HttpResponse> {
    const now = Date.now();
    const cacheEntry = this.cache[url];
    const inFlight = this.inFlight[url];

    if (!force) {
      // if we're not forcing a new get, then check if there is an existing cached or in-flight request
      if (inFlight) {
        // if there's an in-flight one, just return it
        console.debug(`APIDatabase.get(): already in-flight: ${url}`);
        return inFlight;
      } else if (cacheEntry) {
        // if there's a cache entry...
        if ((cacheEntry.time + DEFAULT_CACHE_KEEP) < now) {
          // check if it's old; if it is, fall through to a new request
          console.debug(`APIDatabase.get(): stale: ${url}`);
        } else {
          // otherwise, return the cached response
          console.debug(`APIDatabase.get(): cached: ${url} (${new Date(cacheEntry.time).toISOString()})`);
          return this.cache[url].response;
        }
      }
    }


    const { Http } = Plugins;

    console.debug(`APIDatabase.get(): uncached: ${url}`);
    this.inFlight[url] = Http.request({
      method: 'GET',
      url,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
      },
    }).catch((err: any) => {
      console.error('APIDatabase.get(): request failed, trying again in 1s:', err);
      return new Promise((resolve, reject) => {
        setTimeout(async () => {
          try {
            const response = await Http.request({
              method: 'GET',
              url,
            }) as HttpResponse;
            if (typeof response.data === 'string') {
              try {
                response.data = JSON.parse(response.data);
              } catch (err) {
                console.warn('Unable to parse response.data as JSON', err);
              }
            }
            resolve(response);
          }  catch (err) {
            reject(err);
          }
        }, 1000);
      });
    });

    // delete from the in-flight list as soon as it finishes
    this.inFlight[url].finally(() => {
      delete this.inFlight[url];
    });

    return this.inFlight[url].then((ret: HttpResponse) => {
      // if it succeeds, cache it
      console.debug(`APIDatabase.get(): caching: ${url}`);
      this.cache[url] = {
        url,
        response: Promise.resolve(ret),
        time: now,
      };
      return ret;
    });
  }

  public async teams(force?: boolean): Promise<Team[]> {
    const url = `${this.root}/allTeams`;
    // console.debug(`APIDatabase.teams(): GET ${url}`);
    try {
      const ret = await this.get(url, force);
      if (ret) {
        return ret.data.map((team: any) => new Team(team));
      }
    } catch (err) {
      console.error('APIDatabase.teams(): failed to get list of teams', err);
    }
    return [];
  }

  public async players(...args: any[]): Promise<Player[]> {
    let force = false;
    if (typeof args[args.length - 1] === 'boolean') {
      force = args.pop();
    }
    if (args.length === 0) {
      return [] as Player[];
    }
    const url = `${this.root}/players?ids=${args.join(',')}`;
    // console.debug(`APIDatabase.players(): GET ${url}`);
    try {
      const ret = await this.get(url, force);
      if (ret) {
        return ret.data.map((player: any) => new Player(player));
      }
    } catch (err) {
      console.error('APIDatabase.players(): failed to get players', err);
    }
    return [] as Player[];
  }

  public async globalEvents(force = false) {
    const url = `${this.root}/globalEvents`;
    try {
      const ret = await this.get(url, force);
      if (ret) {
        console.debug('ret=', JSON.stringify(ret));
        return ret?.data?.map((event: any) => new GlobalEvent(event));
      }
    } catch (err) {
      console.error('APIDatabase.globalEvents(): failed to get events', err);
    }
    return [] as GlobalEvent[];
  }
}
