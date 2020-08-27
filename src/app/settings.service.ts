import { Injectable } from '@angular/core';

import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;

export type SEGMENT = 'all'|'active'|'favorites';

@Injectable({
  providedIn: 'root'
})

export class SettingsService {
  private settings = {
    segment: 'all',
    favorites: {}
  } as any;

  public ready: Promise<boolean>;

  constructor() {
    console.debug('SettingsService instantiated.');
    this.ready = this.init();
  }

  async init(): Promise<boolean> {
    console.debug('SettingsService initializing.');
    this.assertSettings();
    return Storage.get({key: 'favorites'}).then(ret => {
      console.debug('SettingsService: ret=', ret);
      if (ret && ret.value !== undefined) {
        this.settings.favorites = JSON.parse(ret.value);
      }
      return Storage.get({key: 'segment'}).then(ret => {
        this.settings.segment = (ret.value as SEGMENT) || 'all';
        console.debug('SettingsService: settings=', this.settings);
        return true;
      });
    }).catch(err => {
      console.error('SettingsService: failed to get favorites:', err);
      this.settings = {
        segment: 'all',
        favorites: {}
      };
      return true;
    });
  }

  assertSettings() {
    if (!this.settings) {
      this.settings = {};
    }
    if (!this.settings.favorites) {
      this.settings.favorites = {};
    }
    if (!this.settings.segment) {
      this.settings.segment = 'all';
    }
  }

  isFavorite(teamId: string) {
    this.assertSettings();
    return Boolean(this.settings.favorites[teamId]);
  }

  setFavorite(teamId: string, value: boolean) {
    this.assertSettings();
    this.settings.favorites[teamId] = value;
    Storage.set({key: 'favorites', value: JSON.stringify(this.settings.favorites)}).then(() => {
      console.debug(`set favorite: ${teamId} = ${value}`);
    });
  }

  toggleFavorite(teamId: string) {
    this.assertSettings();
    this.setFavorite(teamId, !this.isFavorite(teamId));
  }

  getSegment(): SEGMENT {
    this.assertSettings();
    return this.settings.segment;
  }

  setSegment(segment: SEGMENT) {
    this.assertSettings();
    this.settings.segment = segment;
    Storage.set({key: 'segment', value: segment}).then(() => {
      console.debug(`set segment: ${segment}`);
    })
  }
}
