import { Injectable } from '@angular/core';

import { Plugins } from '@capacitor/core';
import { Platform } from '@ionic/angular';

const { Storage } = Plugins;

export type SEGMENT = 'all'|'active'|'favorites';

export interface Settings {
  favorites: { [team: string]: boolean };
  favoriteTeam: string;
  lastUrl: string;
  segment: SEGMENT;
  darkMode: boolean;
  disableSleep: boolean;
  reduceMotion: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  public settings = {
    favorites: {},
    favoriteTeam: undefined,
    lastUrl: undefined,
    segment: 'all',
    darkMode: false,
    disableSleep: false,
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
      await Promise.all([
        this.configureStrings({
          favoriteTeam: undefined,
          lastUrl: undefined,
          segment: 'all',
        }),
        this.configureBooleans([
          'darkMode',
          'disableSleep',
          'reduceMotion',
        ]),
        Storage.get({key: 'favorites'}).then((favorites) => {
          this.settings.favorites = JSON.parse(favorites?.value || "{}");
        }),
      ]);
    } catch (err) {
      console.error('SettingsService.init(): failed to initialize settings.', err);
    }

    console.debug('SettingsService.init(): settings=', this.settings);
    return true;
  }

  async configureBooleans(keys: string[]) {
    const promises = keys.map(async (key: string) => {
      return Storage.get({key}).then((value) => {
        this.settings[key] = value?.value === 'true';
        return true;
      });
    });
    return Promise.all(promises);
  }

  async configureStrings(entries: { [key:string]: string }) {
    const promises = Object.keys(entries).map(async (key: string) => {
      return Storage.get({key}).then((value) => {
        this.settings[key] = value?.value || entries[key];
        return true;
      });
    });
    return Promise.all(promises);
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
    if (this.settings.darkMode === undefined) {
      this.settings.darkMode = false;
    }
    return this.settings;
  }

  async getAll() {
    await this.ready;
    return Object.assign({}, this.assertSettings());
  }

  protected getBoolean(key: string) {
    this.assertSettings();
    return this.settings[key] || false;
  }

  protected async setBoolean(key: string, value: boolean) {
    this.assertSettings();
    this.settings[key] = value;
    await Storage.set({key, value: JSON.stringify(value)});
    console.debug(`set ${key}: ${value}`);
    return value;
  }

  protected async setString(key: string, value: string) {
    this.assertSettings();
    this.settings[key] = value;
    await Storage.set({key, value});
    console.debug(`set ${key}: ${value}`);
    return value;
  }

  protected getString(key: string) {
    this.assertSettings();
    return this.settings[key];
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

  favoriteTeam(): string {
    return this.getString('favoriteTeam');
  }

  async setFavoriteTeam(id: string) {
    return this.setString('favoriteTeam', id);
  }

  lastUrl(): string {
    return this.getString('lastUrl');
  }

  async setLastUrl(url: string) {
    return this.setString('lastUrl', url);
  }

  getSegment(): SEGMENT {
    return this.getString('segment');
  }

  async setSegment(segment: SEGMENT) {
    return this.setString('segment', segment);
  }

  darkMode(): boolean {
    return this.getBoolean('darkMode');
  }

  async setDarkMode(dark: boolean) {
    return this.setBoolean('darkMode', dark);
  }

  disableSleep(): boolean {
    return this.getBoolean('disableSleep');
  }

  async setDisableSleep(disable: boolean) {
    return this.setBoolean('disableSleep', disable);
  }

  reduceMotion(): boolean {
    return this.getBoolean('reduceMotion');
  }

  async setReduceMotion(reduce: boolean) {
    return this.setBoolean('reduceMotion', reduce);
  }

}
