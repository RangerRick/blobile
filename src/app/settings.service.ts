import { Injectable } from '@angular/core';

import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;

export type SEGMENT = 'all'|'active'|'favorites';

@Injectable({
  providedIn: 'root'
})

export class SettingsService {
  private settings = {
    segment: 'all' as SEGMENT,
    favorites: {} as {[key: string]: boolean}
  };
  public ready: Promise<boolean>;

  constructor() {
    console.debug('SettingsService instantiated.');
    this.ready = this.init();
  }

  init(): Promise<boolean> {
    console.debug('SettingsService initializing.');
    return Storage.get({key: 'favorites'}).then(ret => {
      console.debug('SettingsService: ret=', ret);
      if (!ret) {
        this.settings.favorites = {};
      } else {
        this.settings.favorites = JSON.parse(ret.value);
      }
      return Storage.get({key: 'segment'}).then(ret => {
        this.settings.segment = (ret.value as SEGMENT) || 'all';
        console.debug('SettingsService: settings=', this.settings);
        return true;
      });
    }).catch(err => {
      console.error('SettingsService: failed to get favorites:', err);
      return true;
    });
  }

  isFavorite(teamId: string) {
    return Boolean(this.settings.favorites[teamId]);
  }

  setFavorite(teamId: string, value: boolean) {
    this.settings.favorites[teamId] = value;
    Storage.set({key: 'favorites', value: JSON.stringify(this.settings.favorites)}).then(() => {
      console.debug(`set favorite: ${teamId} = ${value}`);
    });
  }

  toggleFavorite(teamId: string) {
    this.setFavorite(teamId, !this.isFavorite(teamId));
  }

  getSegment(): SEGMENT {
    return this.settings.segment;
  }

  setSegment(segment: SEGMENT) {
    this.settings.segment = segment;
    Storage.set({key: 'segment', value: segment}).then(() => {
      console.debug(`set segment: ${segment}`);
    })
  }
}
