import { Injectable } from '@angular/core';

import { Plugins } from '@capacitor/core';
import { Platform } from '@ionic/angular';

const { Storage } = Plugins;

export type SEGMENT = 'all'|'active'|'favorites';

export interface Settings {
  segment: SEGMENT;
  favorites: { [team: string]: boolean };
  disableSleep: boolean;
  favoriteTeam: string;
  lastUrl: string;
  reduceMotion: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  public settings = {
    segment: 'all',
    favorites: {},
    disableSleep: false,
    favoriteTeam: undefined,
    lastUrl: undefined,
    reduceMotion: false,
  } as Settings;

  public ready: Promise<boolean>;

  constructor(
    private platform: Platform,
  ) {
    console.debug('SettingsService instantiated.');
    this.ready = this.init();
  }

  async init(): Promise<boolean> {
    await this.platform.ready();

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
      this.settings.disableSleep = disableSleep?.value === 'true';

      const favoriteTeam = await Storage.get({key: 'favoriteTeam'});
      this.settings.favoriteTeam = favoriteTeam?.value;

      const lastUrl = await Storage.get({key: 'lastUrl'});
      this.settings.lastUrl = lastUrl?.value;

      const reduceMotion = await Storage.get({key: 'reduceMotion'});
      this.settings.reduceMotion = reduceMotion?.value === 'true';
    } catch (err) {
      console.error('SettingsService.init(): failed to initialize settings.', err);
      this.settings = {
        segment: 'all',
        favorites: {},
        disableSleep: false,
        favoriteTeam: undefined,
        lastUrl: undefined,
        reduceMotion: false,
      };
    }

    console.debug('SettingsService.init(): settings=', this.settings);
    return true;
  }

  assertSettings() {
    if (!this.settings) {
      this.settings = {} as Settings;
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
    if (this.settings.reduceMotion === undefined) {
      this.settings.reduceMotion = false;
    }
    return this.settings;
  }

  async getAll() {
    await this.ready;
    return Object.assign({}, this.assertSettings());
  }

  isFavorite(teamId: string) {
    this.assertSettings();
    return this.settings.favorites[teamId];
  }

  async setFavorite(teamId: string, value: boolean) {
    this.assertSettings();
    this.settings.favorites[teamId] = value;
    await Storage.set({key: 'favorites', value: JSON.stringify(this.settings.favorites)});
    console.debug(`set favorite: ${teamId} = ${value}`);
    return value;
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
    await Storage.set({key: 'segment', value: segment});
    console.debug(`set segment: ${segment}`);
    return segment;
  }

  disableSleep(): boolean {
    this.assertSettings();
    return this.settings.disableSleep;
  }

  async setDisableSleep(disable: boolean) {
    this.assertSettings();
    this.settings.disableSleep = disable;
    await Storage.set({key: 'disableSleep', value: JSON.stringify(disable)});
    console.debug(`set disableSleep: ${disable}`);
    return disable;
  }

  favoriteTeam(): string {
    this.assertSettings();
    return this.settings.favoriteTeam;
  }

  async setFavoriteTeam(id: string) {
    this.assertSettings();
    this.settings.favoriteTeam = id;
    await Storage.set({key: 'favoriteTeam', value: id});
    console.debug(`set favoriteTeam: ${id}`);
    return id;
  }

  lastUrl(): string {
    this.assertSettings();
    return this.settings.lastUrl;
  }

  async setLastUrl(url: string) {
    this.assertSettings();
    this.settings.lastUrl = url;
    await Storage.set({key: 'lastUrl', value: url});
    console.debug(`set lastUrl: ${url}`);
    return url;
  }

  reduceMotion(): boolean {
    this.assertSettings();
    return this.settings.reduceMotion;
  }

  async setReduceMotion(reduce: boolean) {
    this.assertSettings();
    this.settings.reduceMotion = reduce;
    await Storage.set({key: 'reduceMotion', value: JSON.stringify(reduce)});
    console.debug(`set reduceMotion: ${reduce}`);
    return reduce;
  }

}
