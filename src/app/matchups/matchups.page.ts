import { Component, OnInit } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';

import { APIStream } from 'src/lib/api/stream';
import { StreamData } from 'src/lib/model/streamData';
import { Team } from 'src/lib/model/team';
import { APIDatabase } from 'src/lib/api/database';
import { TeamPage } from '../team-page/team-page.page';
import { Matchup } from 'src/lib/model/matchup';

interface Splits {
  name: string;
  evenMatchups: Matchup[];
  oddMatchups: Matchup[];
}

@Component({
  selector: 'app-matchups',
  templateUrl: 'matchups.page.html',
  styleUrls: ['matchups.page.scss']
})
export class MatchupsPage implements OnInit {
  loading = true;
  streamData: StreamData;
  splits: Splits[];
  teams = {} as { [key: string]: Team };

  constructor(
    private database: APIDatabase,
    private modalController: ModalController,
    private platform: Platform,
    private stream: APIStream,
  ) {
  }

  async ngOnInit(): Promise<void> {
    await this.platform.ready();
    this.stream.subscribe(async (evt: StreamData|Event) => {
      if (evt instanceof StreamData) {
        this.streamData = evt;
      }
      this.postprocess();
    });
  }

  async openTeam(id: string) {
    console.debug(`opening team: ${id}`);
    const modal = await this.modalController.create({
      component: TeamPage,
      componentProps: {
        id,
      },
    });
    return await modal.present();
  }

  getStyle(matchup: Matchup, type: string) {
    const teamId  = matchup[`${type}Team`];
    const team = this.teams[teamId];
    const background = team.mainColor;
    const foreground = team.contrastingMainColor;
    return `background-color: ${background}; color: ${foreground};`;
  }

  async postprocess() {
    this.splits = [];

    for (let postseason of this.streamData.games.postseasons) {
      const even = [];
      const odd = [];

      const rows = Math.floor(postseason.matchups.length / 2);
      for (let i=0; i < postseason.matchups.length; i++) {
        if (i < rows) {
          odd.push(postseason.matchups[i]);
        } else {
          even.push(postseason.matchups[i]);
        }
      }

      this.splits.push({
        name: postseason.playoffs.name,
        evenMatchups: even,
        oddMatchups: odd,
      });
    }

    for (const team of this.streamData.leagues.teams) {
      this.teams[team.id] = team;
    }

    /*
    console.debug('MatchupsPage.postprocess(): even=', this.evenMatchups);
    console.debug('MatchupsPage.postprocess(): odd=', this.oddMatchups);
    console.debug('MatchupsPage.postprocess(): teams=', this.teams);
    */

    this.loading = false;
  }

  id(item: any) {
    if (item && item.id) {
      return item.id;
    }
    return item;
  }
}
