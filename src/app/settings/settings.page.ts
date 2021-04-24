import { Component, OnInit } from '@angular/core';

import { Plugins } from '@capacitor/core';
const { Device } = Plugins;

import { Deploy } from 'cordova-plugin-ionic/dist/ngx';

import { Team } from '../../lib/model/team';

import { UpdateService } from '../../lib/update.service';
import { APIDatabase } from '../../lib/api/database';
import { Settings, SettingsService, COMM_LEVEL } from '../../lib/settings.service';
import { Platform } from '@ionic/angular';
import Util from 'src/lib/util';
import { VoiceService } from 'src/lib/voice.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  public loading = true;

  public current: Settings;
  public betaEnabled = false;
  public devicePlatform = 'web';
  public hasSpeech = false;

  public teamOptions: any = {
    header: 'Choose Your Team',
  };
  public voiceOptions: any = {
    header: 'Choose a Voice',
  };
  public commentaryLevelOptions: any = {
    header: 'Choose a Commentary Level',
  };

  public teams: Team[];
  public volume: number;
  public voices: SpeechSynthesisVoice[];
  public voice: SpeechSynthesisVoice;
  public commentaryLevels: Object;
  public commentaryLevel: number;

  id = Util.trackById;

  constructor(
    public database: APIDatabase,
    public deploy: Deploy,
    private platform: Platform,
    public settings: SettingsService,
    public updateService: UpdateService,
    public voiceService: VoiceService,
  ) {
    this.hasSpeech = window.speechSynthesis !== undefined;
  }

  async ngOnInit() {
    await this.platform.ready();
    console.debug('SettingsPage.ngOnInit()');

    try {
      const info = await Device.getInfo();
      this.devicePlatform = info.platform;
      console.debug(`SettingsPage.ngOnInit(): platform=${this.devicePlatform}`);
    } catch (err) {
      console.error('SettingsPage.ngOnInit(): failed to get device info:', err);
    }

    if (this.devicePlatform !== 'web') {
      try {
        const configuration = await this.deploy.getConfiguration();
        this.betaEnabled = configuration.channel.toLowerCase() === 'beta';
        console.debug(`SettingsPage.ngOnInit(): betaEnabled=${this.betaEnabled}`);
      } catch (err) {
        console.error('SettingsPage.ngOnInit(): failed to get deploy configuration:', err);
      }
    }

    this.current = await this.settings.getAll();
    this.volume = Math.round(this.current.volume * 1000);

    this.teams = (await this.database.teams()).sort((a: Team, b: Team) => {
      return (a.fullName < b.fullName) ? -1 : (a.fullName > b.fullName) ? 1 : 0;
    });

    this.voices = this.voiceService.voices();
    this.voice = await this.voiceService.voice(this.current.voice);

    this.commentaryLevels = COMM_LEVEL;
    this.commentaryLevel = this.current.commentaryLevel;

    this.loading = false;
    console.debug('SettingsPage.onInit(): current settings=', this.current);
  }

  async setBetaEnabled() {
    return await this.settings.setBetaEnabled(this.current.betaEnabled);
  }

  getTeamName(id: string) {
    const team = this.teams.find((t: Team) => t.id === id);
    return team ? team.fullName : '';
  }

  async setBoolean(key: string) {
    return await this.settings.setBoolean(key, this.current[key]);
  }
  async setString(key: string, ev?: { detail: { value: any }}) {
    console.debug('setString: key=', key);
    console.debug('setString: ev=', ev);
    if (ev && ev.detail && ev.detail.value) {

    }
    return await this.settings.setString(key, this.current[key]);
  }
  async setVolume(ev?: CustomEvent<any>) {
    return await this.settings.setNumber('volume', ev.detail.value / 1000.0);
  }

  async setVoice(ev?: CustomEvent<any>) {
    const voice = await this.voiceService.voice(ev?.detail?.value);
    if (voice) {
      await this.settings.setVoice(ev.detail.value);
      this.speak();
    } else {
      console.error(`Unable to locate voice: ${ev?.detail?.value}`);
    }
  }

  async setCommentaryLevel(ev?: CustomEvent<any>) {
    return await this.settings.setCommentaryLevel(parseInt(ev.detail.value));
  }

  async speak(ev?: CustomEvent<any>) {
    ev?.preventDefault();
    ev?.stopPropagation();
    return this.voiceService.say('The commissioner is doing a great job!', {
      force: true,
    });
  }

  async setFavoriteTeam(detail: { value: string }) {
    const team = this.teams.find((t: Team) => {
      return t.id === detail.value;
    });
    this.settings.setFavoriteTeam(team?.id);
  }
}
