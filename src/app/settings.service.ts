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
    favorites: {},
  } as any;

  public ready: Promise<boolean>;

  constructor() {
    console.debug('SettingsService instantiated.');
    this.ready = this.init();
  }

  async init(): Promise<boolean> {
    console.debug('SettingsService initializing.');
    this.assertSettings();

    try {
      const favorites = await Storage.get({key: 'favorites'});
      if (favorites && favorites.value !== undefined) {
        this.settings.favorites = JSON.parse(favorites.value);
      }

      const segment = await Storage.get({key: 'segment'});
      this.settings.segment = (segment?.value as SEGMENT) || 'all';
    } catch (err) {
      console.error('SettingsService.init(): failed to initialize settings.', err);
      this.settings = {
        segment: 'all',
        favorites: {},
      };
    }

    console.debug('SettingsService.init(): settings=', this.settings);
    return true;
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

  async setFavorite(teamId: string, value: boolean) {
    this.assertSettings();
    this.settings.favorites[teamId] = value;
    return Storage.set({key: 'favorites', value: JSON.stringify(this.settings.favorites)}).then(() => {
      console.debug(`set favorite: ${teamId} = ${value}`);
      return value;
    });
  }

  async toggleFavorite(teamId: string) {
    this.assertSettings();
    return this.setFavorite(teamId, !this.isFavorite(teamId));
  }

  getSegment(): SEGMENT {
    this.assertSettings();
    return this.settings.segment;
  }

  async setSegment(segment: SEGMENT) {
    this.assertSettings();
    this.settings.segment = segment;
    return Storage.set({key: 'segment', value: segment}).then(() => {
      console.debug(`set segment: ${segment}`);
      return segment;
    });
  }

}
