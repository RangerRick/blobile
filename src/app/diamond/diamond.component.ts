import { Component, Input, OnInit, Output, EventEmitter, DoCheck, OnChanges, SimpleChanges, ChangeDetectorRef } from '@angular/core';

import { ModalController } from '@ionic/angular';

import { SettingsService } from '../../lib/settings.service';
import { APIDatabase } from '../../lib/api/database';
import { Team } from '../../lib/model/team';

import { TeamPage } from '../team-page/team-page.page';
import { Game } from 'src/lib/model/game';
import Util from 'src/lib/util';

// import Positions from '../../lib/model/positions';
// import Player from '../../lib/model/player';

@Component({
  selector: 'app-diamond',
  templateUrl: './diamond.component.html',
  styleUrls: ['./diamond.component.scss'],
})
export class DiamondComponent implements DoCheck, OnChanges, OnInit {
  @Input() public game: Game;
  @Output("refresh") public refresh: EventEmitter<any> = new EventEmitter();

  public font = {
    color: 'white',
    family: 'Arial Narrow Bold, Arial Narrow, Impact, sans-serif',
    size: '1.5rem',
    strokeWidth: 0.1,
    weight: '500',
  };

  public coordinates = {
    // [ x, y ]
    first:   [ 440, 355 ],
    second:  [ 328, 190 ],
    third:   [ 215, 355 ],
    home:    [ 328, 505 ],
    pitcher: [ 328, 290 ],
  };

  public teams = {} as { [key: string]: Team };

  private oldGame = '';

  constructor(
    private changeDetector: ChangeDetectorRef,
    public database: APIDatabase,
    public modalController: ModalController,
    public settings: SettingsService,
  ) {
    // console.debug('Diamond component created.');
  }
  async ngOnInit() {
    // console.debug('Diamond component initialized.');
    // console.debug(this.game);

    await this.settings.ready;

    for (const team of (await this.database.teams())) {
      this.teams[team.id] = team;
    }

    return true;
  }

  ngDoCheck(): void {
    if (JSON.stringify(this.game) !== this.oldGame) {
      this.changeDetector.markForCheck();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    this.oldGame = JSON.stringify(this.game);
    this.checkInterestingEvents();
  }

  checkInterestingEvents() {
    // just for testing
    // this.game.data.lastUpdate = 'rogue umpire incinerated';
    // this.game.data.lastUpdate = 'switched teams and feedback';
    // this.game.data.lastUpdate = 'hits a grand slam';
    // this.game.data.lastUpdate = 'hits a home run';

    const id = `diamond-${this.game.id}`;
    const update = this.game.lastUpdate.toLowerCase();
    if (
      update.indexOf('home run') >= 0
    ) {
      Util.confetti(id, 'HOME RUN!');
    } else if (
      update.indexOf('hits a grand slam') >= 0
    ) {
      Util.confetti(id, 'GRAND SLAM!', {
        particleCount: 100,
      });
    } else if (
      update.indexOf('rogue umpire incinerated') >= 0
    ) {
      Util.message(id, '🔥 INCINERATED 🔥', {
        fontSize: '3em',
        messageColor: '#ffdf19',
      });
    } else if (
      update.indexOf('blooddrain') >= 0
    ) {
      Util.message(id, '🩸 BLOODDRAIN 🩸', {
        fontSize: '3em',
        messageColor: '#d00',
      });
    } else if (
      update.indexOf('switched teams') >= 0 && update.indexOf('feedback') >= 0
    ) {
      Util.message(id, '🎤 FEEDBACK 🎤', {
        fontSize: '3em',
        messageColor: '#f40576',
      });
    } else if (
      update.indexOf('reverb') >= 0
    ) {
      Util.message(id, '🌊 REVERB 🌊', {
        fontSize: '3em',
        messageColor: '#62b2ff',
      });
    } else if (
      this.game.halfInningOuts === 2 &&
      this.game.atBatBalls === 3 &&
      (this.game.atBatStrikes === (this.game.topOfInning === false? this.game.homeStrikes : this.game.awayStrikes) - 1)
    ) {
      Util.message(id, 'MAXIMUM\nBLASEBALL!');
    }
  }

  isFavorite(teamId: string) {
    return this.settings.isFavorite(teamId);
  }

  toggleFavorite(teamId: string) {
    this.settings.toggleFavorite(teamId);
    if (this.refresh) {
      console.debug('toggleFavorite(): refreshing');
      this.refresh.emit();
    }
  }

  inProgress() {
    return this.game && !this.game.gameComplete;
  }

  getName(person: any) {
    if (person && person.name) {
      return person.name;
    }
    return null;
  }

  getBaseRunner(base: number) {
    if (this.inProgress()) {
      for (let i=0; i < this.game.basesOccupied.length; i++) {
        const b = this.game.basesOccupied[i];
        if (b === base) {
          return { name: this.game.baseRunnerNames[i], id: this.game.baseRunners[i] };
        }
      }
    }
    return null;
  }

  getPitcher() {
    if (this.inProgress()) {
      if (this.game.topOfInning) {
        return { id: this.game.homePitcher, name: this.game.homePitcherName };
      } else {
        return { id: this.game.awayPitcher, name: this.game.awayPitcherName };
      }
    }
    return null;
  }

  getBatter() {
    if (this.inProgress()) {
      if (this.game.topOfInning) {
        return { id: this.game.awayBatter, name: this.game.awayBatterName };
      } else {
        return { id: this.game.homeBatter, name: this.game.homeBatterName };
      }
    }
  }

  getEmoji(type: string) {
    switch(type) {
      case 'home':
        return String.fromCodePoint(parseInt(this.game.homeTeamEmoji, 16));
      case 'away':
        return String.fromCodePoint(parseInt(this.game.awayTeamEmoji, 16));
      default:
        return '';
    }
  }

  async openTeam(id: string) {
    console.debug(`opening team: ${id}`);
    const modal = await this.modalController.create({
      component: TeamPage,
      componentProps: {
        id: id,
      },
    });
    return await modal.present();
  }
}
