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
    disableSleep: false,
    favoriteTeam: undefined,
    lastUrl: undefined,
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

      const disableSleep = await Storage.get({key: 'disableSleep'});
      this.settings.disableSleep = Boolean(disableSleep?.value || false);

      const favoriteTeam = await Storage.get({key: 'favoriteTeam'});
      this.settings.favoriteTeam = favoriteTeam?.value;

      const lastUrl = await Storage.get({key: 'lastUrl'});
      this.settings.lastUrl = lastUrl?.value;
    } catch (err) {
      console.error('SettingsService.init(): failed to initialize settings.', err);
      this.settings = {
        segment: 'all',
        favorites: {},
        disableSleep: false,
        favoriteTeam: undefined,
        lastUrl: undefined,
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
    if (this.settings.disableSleep === undefined) {
      this.settings.disableSleep = false;
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

  disableSleep(): boolean {
    this.assertSettings();
    return this.settings.disableSleep;
  }

  async setDisableSleep(disable: boolean) {
    this.assertSettings();
    this.settings.disableSleep = disable;
    return Storage.set({key: 'disableSleep', value: String(disable)}).then(() => {
      console.debug(`set disableSleep: ${disable}`);
      return disable;
    });
  }

  favoriteTeam(): string {
    this.assertSettings();
    return this.settings.favoriteTeam;
  }

  async setFavoriteTeam(id: string) {
    this.assertSettings();
    this.settings.favoriteTeam = id;
    return Storage.set({key: 'favoriteTeam', value: id}).then(() => {
      console.debug(`set favoriteTeam: ${id}`);
      return id;
    });
  }

  lastUrl(): string {
    this.assertSettings();
    return this.settings.lastUrl;
  }

  async setLastUrl(url: string) {
    this.assertSettings();
    this.settings.lastUrl = url;
    return Storage.set({key: 'lastUrl', value: url}).then(() => {
      console.debug(`set lastUrl: ${url}`);
      return url;
    });
  }
}
