import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { APIStream } from 'src/lib/api/stream';
import { StreamData } from 'src/lib/model/streamData';
import { Standings } from 'src/lib/model/standings';
import { Team } from 'src/lib/model/team';
import { Leagues } from 'src/lib/model/leagues';
import { Subleague } from 'src/lib/model/subleague';
import { Division } from 'src/lib/model/division';
import { APIDatabase } from 'src/lib/api/database';
import { Tiebreaker } from 'src/lib/model/tiebreaker';
import { TeamPage } from '../team-page/team-page.page';

interface LeagueData {
  id: string;
  name: string;
  subleagues: SubleagueData[];
}

interface SubleagueData {
  id: string;
  name: string;
  divisions: DivisionData[];
}

interface DivisionData {
  id: string;
  name: string;
  teams: TeamData[];
}

interface TeamData {
  id: string;
  name: string;
  wins: number;
  losses: number;
}

@Component({
  selector: 'app-standings',
  templateUrl: 'standings.page.html',
  styleUrls: ['standings.page.scss']
})
export class StandingsPage implements OnInit {
  leagues = new Leagues({});
  standings = new Standings({});

  data = { subleagues: [] } as LeagueData;

  constructor(
    private database: APIDatabase,
    private modalController: ModalController,
    private stream: APIStream,
  ) {
  }

  async ngOnInit(): Promise<void> {
    const currentData = this.stream.currentStreamData();
    if (currentData) {
      this.leagues = currentData.leagues;
      this.standings = currentData.games.standings;
    }
    await this.postprocess();

    this.stream.subscribe(async (evt: StreamData|Event) => {
      if (evt instanceof StreamData) {
        this.leagues = evt.leagues;
        this.standings = evt.games.standings;
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

  async postprocess() {
    const l = this.leagues?.leagues[0];
    if (!l) {
      return;
    }

    this.data.name = l.name;

    const teams = await this.database.teams();
    const tiebreakers = this.leagues.tiebreakers.find((tiebreaker: Tiebreaker) => tiebreaker.id === l.tiebreakers);

    const sl = this.leagues?.subleagues?.filter((s: Subleague) => {
      return l.subleagues.indexOf(s.id) >= 0;
    });

    this.data.subleagues = sl.map((s: Subleague) => {
      const sl_d = {
        id: s.id,
        name: s.name,
      } as SubleagueData;

      const d = this.leagues?.divisions?.filter((item: Division) => {
        return s.divisions.indexOf(item.id) >= 0;
      });

      sl_d.divisions = d.map((div: Division) => {
        const div_d = {
          id: div.id,
          name: div.name,
        } as DivisionData;

        div_d.teams = div.teams.map((id: string) => {
          const t = teams.find((team: Team) => id === team.id);
          const t_d = {
            id: t.id,
            name: t.fullName,
            emoji: String.fromCodePoint(parseInt(t.emoji)),
            emojiColor: t.emojiColor,
            mainColor: t.mainColor,
            secondaryColor: t.secondaryColor,
            mainTextColor: t.contrastingMainColor,
            secondaryTextColor: t.contrastingSecondaryColor,
            wins: this.standings.wins[t.id],
            losses: this.standings.losses[t.id],
          };

          return t_d;
        });

        div_d.teams.sort((a: TeamData, b: TeamData) => {
          let ret = b.wins - a.wins;

          if (ret === 0) {
            const aTiebreaker = tiebreakers.order.indexOf(a.id);
            const bTiebreaker = tiebreakers.order.indexOf(b.id);

            ret = aTiebreaker - bTiebreaker;
          }

          return ret;
        });

        return div_d;
      });

      return sl_d;
    });

    console.debug('leagues:', this.leagues);
    console.debug('standings:', this.standings);
    console.debug('teams:', teams);
    console.debug('data:', this.data);
  }

  id(item: any) {
    if (item && item.id) {
      return item.id;
    }
    return item;
  }
}
