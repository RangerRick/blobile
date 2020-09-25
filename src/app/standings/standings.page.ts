import { Component, OnInit } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';

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
  playoffs: boolean;
}

@Component({
  selector: 'app-standings',
  templateUrl: 'standings.page.html',
  styleUrls: ['standings.page.scss']
})
export class StandingsPage implements OnInit {
  loading = true;
  leagues = new Leagues({});
  standings = new Standings({});
  tiebreakers = new Tiebreaker({});

  data = { subleagues: [] } as LeagueData;

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

    const sortByWins = (a: Team, b: Team) => {
      const aWins = this.standings.wins[a.id];
      const bWins = this.standings.wins[b.id];

      let ret = bWins - aWins;
      if (ret === 0) {
        const aTiebreaker = this.tiebreakers.order.indexOf(a.id);
        const bTiebreaker = this.tiebreakers.order.indexOf(b.id);

        ret = aTiebreaker - bTiebreaker;
      }

      return ret;
    };

    this.tiebreakers = this.leagues.tiebreakers.find((tiebreaker: Tiebreaker) => tiebreaker.id === l.tiebreakers);
    const teams = await this.database.teams();

    const sl = this.leagues?.subleagues?.filter((s: Subleague) => {
      return l.subleagues.indexOf(s.id) >= 0;
    });

    this.data.subleagues = sl.map((s: Subleague) => {
      const sl_d = {
        id: s.id,
        name: s.name,
      } as SubleagueData;

      const sl_teams = [] as TeamData[];

      const d = this.leagues?.divisions?.filter((item: Division) => {
        return s.divisions.indexOf(item.id) >= 0;
      });

      sl_d.divisions = d.sort((a: Division, b: Division) => {
        return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
      }).map((div: Division) => {
        const div_d = {
          id: div.id,
          name: div.name,
        } as DivisionData;

        div_d.teams = div.teams
          .map((id: string) => teams.find((team: Team) => id === team.id))
          .sort(sortByWins)
          .map((team: Team) => {
          const t_d = {
            id: team.id,
            name: team.fullName,
            emoji: String.fromCodePoint(parseInt(team.emoji)),
            emojiColor: team.emojiColor,
            mainColor: team.mainColor,
            secondaryColor: team.secondaryColor,
            mainTextColor: team.contrastingMainColor,
            secondaryTextColor: team.contrastingSecondaryColor,
            wins: this.standings.wins[team.id],
            losses: this.standings.losses[team.id],
            playoffs: false,
          };

          sl_teams.push(t_d);

          return t_d;
        });

        return div_d;
      });

      sl_teams.sort((a: TeamData, b: TeamData) => {
        let ret = b.wins - a.wins;
        if (ret === 0) {
          ret = this.tiebreakers.order.indexOf(a.id) - this.tiebreakers.order.indexOf(b.id);
        }

        return ret;
      }).filter((_, index) => {
        return index < 4;
      }).map((team: TeamData) => {
        team.playoffs = true;
      });

      return sl_d;
    });

    this.loading = false;
    // console.debug('leagues:', this.leagues);
    // console.debug('standings:', this.standings);
    // console.debug('teams:', teams);
    // console.debug('data:', this.data);
  }

  id(item: any) {
    if (item && item.id) {
      return item.id;
    }
    return item;
  }
}
