import { Injectable } from '@angular/core';
import { Device } from '@capacitor/device';

import '@capacitor-community/http';
import { Http, HttpResponse } from '@capacitor-community/http';

import { Team } from '../model/team';
import { Player } from '../model/player';
import { GlobalEvent } from '../model/globalEvent';
import { Game } from '../model/game';

const DEFAULT_CACHE_KEEP = 10 * 60 * 1000; // 10 minutes
const ONE_DAY = 24 * 60 * 60 * 1000;

interface QueryOptions {
  force?: boolean;
  expiration?: number;
}

interface CacheEntry {
  url: string;
  response: Promise<HttpResponse>;
  expiration: number;
}

@Injectable({
  providedIn: 'root'
})
export class APIDatabase {
  private cache = {} as { [url: string]: CacheEntry };
  private inFlight = {} as { [url: string]: Promise<HttpResponse> };
  private root: string;

  private async getRoot() {
    if (!this.root) {
      try {
        const info = await Device.getInfo();
        if (info.platform !== 'web') {
          this.root = 'https://www.blaseball.com/database';
        }
      } catch (err) {
        console.warn('APIDatabase.getRoot(): failed to get device info, assuming web platform.', err);
      }
      if (!this.root) {
        this.root = 'https://cors-proxy.blaseball-reference.com/database';
      }
    }

    return this.root;
  }

  private async get(url: string, options = {} as QueryOptions): Promise<HttpResponse> {
    const now = Date.now();
    const cacheEntry = this.cache[url];
    const inFlight = this.inFlight[url];

    const expiration = options?.expiration || now + DEFAULT_CACHE_KEEP;
    const force = options?.force || false;

    if (!force) {
      // if we're not forcing a new get, then check if there is an existing cached or in-flight request
      if (inFlight) {
        // if there's an in-flight one, just return it
        console.debug(`APIDatabase.get(): already in-flight: ${url}`);
        return inFlight;
      } else if (cacheEntry) {
        // if there's a cache entry...
        if (cacheEntry.expiration < now) {
          // check if it's old; if it is, fall through to a new request
          console.debug(`APIDatabase.get(): stale: ${url}`);
        } else {
          // otherwise, return the cached response
          console.debug(`APIDatabase.get(): cached: ${url} (expires ${new Date(cacheEntry.expiration).toISOString()})`);
          return this.cache[url].response;
        }
      }
    }


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
            resolve(response);
          }  catch (err) {
            reject(err);
          }
        }, 1000);
      });
    }).then((response: HttpResponse) => {
      if (typeof response.data === 'string') {
        try {
          response.data = JSON.parse(response.data);
        } catch (err) {
          console.warn('Unable to parse response.data as JSON', err);
        }
      }
      return response;
    });

    // delete from the in-flight list as soon as it finishes
    this.inFlight[url].finally(() => {
      delete this.inFlight[url];
    });

    return this.inFlight[url].then((ret: HttpResponse) => {
      // if it succeeds, cache it
      console.debug(`APIDatabase.get(): caching: ${url}`);
      this.cache[url] = {
        expiration,
        response: Promise.resolve(ret),
        url,
      };
      return ret;
    });
  }

  public async seriesRecord(teamA: string, teamB: string, season: number, day: number, count = 3): Promise<[number, number]> {
    const ret = [0, 0] as [number, number];
    for (let index = 0; index < count; index++) {
      const d = day - index;
      if (d >= 0) {
        const games = await this.gamesByDay(season, d);
        // console.debug('Database.seriesRecord(): games=', games);
        const game = games.filter((g: Game) => {
          return (g.awayTeam === teamA && g.homeTeam === teamB)
            || (g.homeTeam === teamA && g.awayTeam === teamB);
        })[0];
        if (game && game.gameComplete) {
          if (game.winnerId === teamA) {
            ret[0]++;
          } else {
            ret[1]++;
          }
        }
      }
    }
    return ret;
  }

  public async gamesByDay(season: number, day: number, force = false): Promise<Game[]> {
    const root = await this.getRoot();
    const url = `${root}/games?season=${season}&day=${day}`;

    try {
      const ret = await this.get(url, {
        expiration: Date.now() + ONE_DAY,
        force,
      });
      if (ret) {
        return ret.data.map((game: any) => new Game(game));
      }
    } catch (err) {
      console.error(`APIDatabase.gamesByDay(): failed to get list of games for (0-indexed) season: ${season}, day: ${day}`, err);
    }
    return [];
  }

  public async teams(force = false): Promise<Team[]> {
    const root = await this.getRoot();
    const url = `${root}/allTeams`;

    // console.debug(`APIDatabase.teams(): GET ${url}`);
    try {
      const ret = await this.get(url, { force });
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

    const root = await this.getRoot();
    const url = `${root}/players?ids=${args.join(',')}`;

    // console.debug(`APIDatabase.players(): GET ${url}`);
    try {
      const ret = await this.get(url, { force });
      if (ret?.data && Array.isArray(ret.data)) {
        return ret.data.map((player: any) => new Player(player));
      }
    } catch (err) {
      console.error('APIDatabase.players(): failed to get players', err);
    }
    return [] as Player[];
  }

  public async globalEvents(force = false) {
    const root = await this.getRoot();
    const url = `${root}/globalEvents`;

    try {
      const ret = await this.get(url, { force });
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
