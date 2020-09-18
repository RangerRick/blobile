import { Component, Input, OnInit, Output, EventEmitter, DoCheck, ChangeDetectorRef } from '@angular/core';

import { ModalController } from '@ionic/angular';

import { SettingsService } from '../../lib/settings.service';
import { APIDatabase } from '../../lib/api/database';
import { Game } from '../../lib/model/game';
import { Team } from '../../lib/model/team';

import { TeamPage } from '../team-page/team-page.page';
import { MessageOptions } from '../../lib/util';
import Util from 'src/lib/util';
import { GameDetailPage } from '../game-detail/game-detail.page';

// import Positions from '../../lib/model/positions';
// import Player from '../../lib/model/player';

@Component({
  selector: 'app-diamond',
  templateUrl: './diamond.component.html',
  styleUrls: ['./diamond.component.scss'],
})
export class DiamondComponent implements DoCheck, OnInit {
  @Input() public game: Game;
  @Input() public allowOpenGame = true;
  @Output() public refresh: EventEmitter<any> = new EventEmitter();

  public font = {
    color: 'white',
    /*
    family: 'Arial Narrow Bold, Arial Narrow, Impact, sans-serif',
    */
   family: 'sans-serif',
    size: '1.3rem',
    strokeWidth: '0.115em',
    weight: 'bold',
  };

  public coordinates = {
    // [ x, y ]
    first:   [ 440, 355 ],
    second:  [ 328, 185 ],
    third:   [ 215, 355 ],
    home:    [ 328, 505 ],
    pitcher: [ 328, 290 ],
  };

  public teams = {} as { [key: string]: Team };

  private oldGame = {} as Game;

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
    if (this.oldGame && this.game && this.oldGame.hash !== this.game.hash) {
      this.changeDetector.markForCheck();
      this.oldGame = this.game;
      this.checkInterestingEvents();
    }
  }

  checkInterestingEvents() {
    // just for testing
    // this.game.data.lastUpdate = 'rogue umpire incinerated';
    // this.game.data.lastUpdate = 'switched teams and feedback';
    // this.game.data.lastUpdate = 'hits a grand slam';
    // this.game.data.lastUpdate = 'hits a home run';
    // this.game.data.lastUpdate = 'reverb';
    // this.game.data.lastUpdate = 'blooddrain';

    const options = {
      reduceMotion: this.settings.reduceMotion()
    } as MessageOptions;

    const diamondId = `diamond-${this.game.id}`;
    const svgWrapperId = `diamond-main-${this.game.id}`;
    const update = this.game?.lastUpdate?.toLowerCase() || '';
    if (
      update.indexOf('home run') >= 0
    ) {
      Util.confetti(svgWrapperId, 'HOME RUN!', options);
    } else if (
      update.indexOf('hits a grand slam') >= 0
    ) {
      Util.confetti(svgWrapperId, 'GRAND SLAM!', Object.assign({
        particleCount: 100,
      }, options));
    } else if (
      update.indexOf('rogue umpire incinerated') >= 0
    ) {
      Util.message(svgWrapperId, '🔥 INCINERATED 🔥', {
        fontSize: '3em',
        messageColor: '#ffdf19',
      });
    } else if (
      update.indexOf('blooddrain') >= 0
    ) {
      Util.message(svgWrapperId, '🩸 BLOODDRAIN 🩸', {
        fontSize: '3em',
        messageColor: '#e44',
      });
    } else if (
      update.indexOf('switched teams') >= 0 && update.indexOf('feedback') >= 0
    ) {
      Util.message(svgWrapperId, '🎤 FEEDBACK 🎤', {
        fontSize: '3em',
        messageColor: '#f40576',
      });
    } else if (
      update.indexOf('reverb') >= 0
    ) {
      Util.message(svgWrapperId, '🌊 REVERB 🌊', {
        fontSize: '3em',
        messageColor: '#62b2ff',
        blink: true,
        classes: { [diamondId]: 'shake' },
      });
    } else if (
      this.game.halfInningOuts === 2 &&
      this.game.atBatBalls === 3 &&
      (this.game.atBatStrikes === (this.game.topOfInning === false ? this.game.homeStrikes : this.game.awayStrikes) - 1)
    ) {
      Util.message(svgWrapperId, 'MAXIMUM\nBLASEBALL!');
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

  getName(person?: { name: string }, index?: number) {
    if (person && person.name) {
      if (index === undefined) {
        return person.name;
      } else if (person.name.length > 15) {
        return person.name.split(' ')[index];
      } else if (index === 0) {
        return person.name;
      }
    }
    return null;
  }

  getBaseRunner(baseIndex: number) {
    if (this.inProgress()) {
      return this.game?.getBaseRunner(baseIndex);
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
    switch (type) {
      case 'home':
        return String.fromCodePoint(parseInt(this.game.homeTeamEmoji, 16));
      case 'away':
        return String.fromCodePoint(parseInt(this.game.awayTeamEmoji, 16));
      default:
        return '';
    }
  }

  async openTeam(id: string, ev: Event) {
    if (ev) {
      ev.stopPropagation();
      ev.preventDefault();
    }
    console.debug(`opening team: ${id}`);
    const modal = await this.modalController.create({
      component: TeamPage,
      componentProps: {
        id,
      },
    });
    return await modal.present();
  }

  async watchGame(id: string, allowOpenGame: boolean, ev: Event) {
    if (ev) {
      ev.stopPropagation();
      ev.preventDefault();
    }
    if (allowOpenGame) {
      const modal = await this.modalController.create({
        component: GameDetailPage,
        componentProps: {
          id,
        },
      });
      return await modal.present();
    } else {
      console.debug(`DiamondComponent.watchGame(): opening game not allowed: ${id}`);
    }
  }
}
