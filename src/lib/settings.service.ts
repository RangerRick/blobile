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
  voice: string;
  audio: boolean;
  darkMode: boolean;
  disableSleep: boolean;
  reduceMotion: boolean;
  speech: boolean;
  volume: number;
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
    audio: true,
    darkMode: false,
    disableSleep: false,
    reduceMotion: false,
    speech: true,
    volume: 1.0,
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
          voice: undefined,
        }),
        this.configureBooleans({
          audio: true,
          darkMode: false,
          disableSleep: false,
          reduceMotion: false,
          speech: true,
        }),
        this.configureNumbers({
          volume: 1.0,
        }),
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

  async configureBooleans(entries: {[key:string]: boolean }) {
    const promises = Object.keys(entries).map(async (key: string) => {
      return Storage.get({key}).then((value) => {
        if (value?.value !== undefined) {
          this.settings[key] = value.value === 'true';
        } else {
          this.settings[key] = entries[key] || false;
        }
        return true;
      });
    });
    return Promise.all(promises);
  }

  async configureNumbers(entries: { [key:string]: number }) {
    const promises = Object.keys(entries).map(async (key: string) => {
      return Storage.get({key}).then((value) => {
        if (value?.value) {
          this.settings[key] = JSON.parse(value.value);
        } else {
          this.settings[key] = entries[key];
        }
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
    if (this.settings.audio === undefined) {
      this.settings.audio = true;
    }
    if (this.settings.disableSleep === undefined) {
      this.settings.disableSleep = false;
    }
    if (this.settings.reduceMotion === undefined) {
      this.settings.reduceMotion = false;
    }
    if (this.settings.speech === undefined) {
      this.settings.speech = true;
    }
    if (this.settings.darkMode === undefined) {
      this.settings.darkMode = false;
    }
    if (this.settings.volume === undefined) {
      this.settings.volume = 1.0;
    }
    return this.settings;
  }

  async getAll() {
    await this.ready;
    return Object.assign({}, this.assertSettings());
  }

  getBoolean(key: string) {
    this.assertSettings();
    return this.settings[key] || false;
  }
  async setBoolean(key: string, value: boolean) {
    this.assertSettings();
    this.settings[key] = value;
    await Storage.set({key, value: JSON.stringify(value)});
    console.debug(`setBoolean: ${key} = ${value}`);
    return value;
  }

  getString(key: string) {
    this.assertSettings();
    return this.settings[key];
  }
  async setString(key: string, value: string) {
    this.assertSettings();
    this.settings[key] = value;
    await Storage.set({key, value});
    console.debug(`setString: ${key} = ${value}`);
    return value;
  }

  getNumber(key: string) {
    this.assertSettings();
    return this.settings[key];
  }
  async setNumber(key: string, value: number) {
    this.assertSettings();
    this.settings[key] = value;
    await Storage.set({key, value: JSON.stringify(value)});
    console.debug(`setNumber: ${key} = ${value}`);
    return value;
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

  segment(): SEGMENT {
    return this.getString('segment');
  }
  async setSegment(segment: SEGMENT) {
    return this.setString('segment', segment);
  }

  voice(): string {
    return this.getString('voice');
  }
  async setVoice(voice: string) {
    return this.setString('voice', voice);
  }

  audio(): boolean {
    return this.getBoolean('audio');
  }
  async setAudio(audio: boolean) {
    return this.setBoolean('audio', audio);
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

  speech(): boolean {
    return this.getBoolean('speech');
  }
  async setSpeech(speech: boolean) {
    return this.setBoolean('speech', speech);
  }
  async toggleSpeech() {
    return await this.setSpeech(!this.speech());
  }

  volume(): number {
    return this.getNumber('volume');
  }
  async setVolume(volume: number) {
    return this.setNumber('volume', volume);
  }
}
