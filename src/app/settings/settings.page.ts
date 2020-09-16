import { Component, OnInit } from '@angular/core';

import { Plugins } from '@capacitor/core';
const { Device } = Plugins;

import { Deploy } from 'cordova-plugin-ionic/dist/ngx';

import { Team } from '../../lib/model/team';

import { UpdateService } from '../../lib/update.service';
import { APIDatabase } from '../../lib/api/database';
import { SettingsService } from '../../lib/settings.service';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  public betaEnabled = false;
  public disableSleep = false;
  public devicePlatform = 'web';
  public favoriteTeam: string;

  public teamOptions: any = {
    header: 'Choose Your Team',
  };

  public teams = [] as Team[];

  constructor(
    public database: APIDatabase,
    public deploy: Deploy,
    private platform: Platform,
    public settings: SettingsService,
    public updateService: UpdateService,
  ) {
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

    await this.settings.ready;

    this.disableSleep = this.settings.disableSleep();
    console.debug(`SettingsPage.ngOnInit(): disableSleep=${this.disableSleep}`);

    this.teams = (await this.database.teams()).sort((a: Team, b: Team) => {
      return (a.fullName < b.fullName) ? -1 : (a.fullName > b.fullName) ? 1 : 0;
    });
    console.debug(`SettingsPage.ngOnInit(): teams=`, this.teams);

    this.favoriteTeam = this.settings.favoriteTeam();
    /*
    this.favoriteTeam = this.teams.find((team:Team) => {
      return team.id === favoriteTeam;
    });
    */
    console.debug(`SettingsPage.ngOnInit(): favoriteTeam=${this.favoriteTeam}`);
  }

  async isBeta() {
    const config = await this.deploy.getConfiguration();
    return config.channel.toLowerCase() === 'beta';
  }

  async setBeta() {
    await this.deploy.configure({
      channel: this.betaEnabled ? 'Beta' : 'Stable'
    });
    return await this.isBeta();
  }

  async setDisableSleep() {
    return await this.settings.setDisableSleep(this.disableSleep);
  }

  async setFavoriteTeam(detail: { value: string }) {
    const team = this.teams.find((t: Team) => {
      return t.id === detail.value;
    });
    this.settings.setFavoriteTeam(team?.id);
  }
}
