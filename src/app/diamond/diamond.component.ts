import { Component, Input, OnInit, Output, EventEmitter, DoCheck, ChangeDetectorRef } from '@angular/core';

import { ModalController } from '@ionic/angular';

import { SettingsService } from '../../lib/settings.service';
import { APIDatabase } from '../../lib/api/database';
import { BossFight } from '../../lib/model/bossfight';
import { Game } from '../../lib/model/game';
import { Team } from '../../lib/model/team';

import { TeamPage } from '../team-page/team-page.page';
import { MessageOptions } from '../../lib/util';
import Util from 'src/lib/util';
import { GameDetailPage } from '../game-detail/game-detail.page';

// import Positions from '../../lib/model/positions';
// import Player from '../../lib/model/player';

import { environment } from '../../environments/environment';

@Component({
  selector: 'app-diamond',
  templateUrl: './diamond.component.html',
  styleUrls: ['./diamond.component.scss'],
})
export class DiamondComponent implements DoCheck, OnInit {
  @Input() public game: Game | BossFight;
  @Input() public allowOpenGame = true;
  @Input() public prefix = 'diamond';
  @Input() public hideLog = false;
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

  private oldGame = {} as Game | BossFight;
  public environment = environment;
  public record: [number, number];
  public isBossFight: boolean;

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

    this.checkBossFight();

    return true;
  }

  ngDoCheck(): void {
    // this.checkInterestingEvents();
    if (this.oldGame && this.game && this.oldGame.hash !== this.game.hash) {
      this.changeDetector.markForCheck();
      this.oldGame = this.game;
      this.checkInterestingEvents();
      this.checkBossFight();
      // this.retrieveRecord();
    }
  }

  checkBossFight() {
    // this.isBossFight = true;
    this.isBossFight = this.game instanceof BossFight;
  }

  /* turns out TGB stopped making this expensive calculation too ;) */
  async retrieveRecord() {
    if (this.game && !this.record) {
      try {
        this.record = await this.database.seriesRecord(
          this.game.homeTeam,
          this.game.awayTeam,
          this.game.season - 1,
          this.game.day - 1,
          this.game.seriesIndex,
        );
        // console.debug(`DiamondComponent.retrieveRecord():`, this.record);
      } catch (err) {
        console.error('DiamondComponent.retrieveRecord(): failed to get series record', err);
      }
    }
  }

  checkInterestingEvents() {
    const options = {
      reduceMotion: this.settings.reduceMotion(),
    } as MessageOptions;

    const diamondId = `${this.prefix}-${this.game.id}`;
    const svgWrapperId = `${this.prefix}-main-${this.game.id}`;
    // tslint:disable-next-line:prefer-const
    let update = this.game?.lastUpdate?.toLowerCase() || '';

    // just for testing
    // update = 'rogue umpire incinerated';
    // update = 'switched teams and feedback';
    // update = 'hits a grand slam';
    // update = 'hits a home run';
    // update = 'reverb';
    // update = 'blooddrain';
    // update = 'is now flickering';
    // update = 'the electricity zaps';
    // update = 'is partying!';
    // update = 'the instability chains to';
    // update = 'the birds pecked';
    // update = 'had an allergic reaction';
    // update = 'is now unstable';

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
      update.indexOf('blooddrain') >= 0
    ) {
      Util.message(svgWrapperId, '🩸 BLOODDRAIN 🩸', {
        fontSize: '3em',
        messageColor: '#e44',
      });
    } else if (
      update.indexOf('is partying') >= 0
    ) {
      Util.message(svgWrapperId, '🎉 PARTY 🎉', {
        fontSize: '3em',
        messageColor: '#44ff44',
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
      update.indexOf('the birds pecked') >= 0
    ) {
      Util.message(svgWrapperId, '🦅 BIRDS 🦅', {
        fontSize: '3em',
        messageColor: '#ff8933',
      });
    } else if (
      update.indexOf('had an allergic reaction') >= 0
    ) {
      Util.message(svgWrapperId, '🥜 PEANUT 🥜', {
        fontSize: '3em',
        messageColor: '#ff8933',
      });
    } else if (
      update.indexOf('rogue umpire incinerated') >= 0
    ) {
      Util.message(svgWrapperId, '🔥 INCINERATED 🔥', {
        fontSize: '3em',
        messageColor: '#ffdf19',
      });
    } else if (
      update.indexOf('feedback') >= 0 && (
        update.indexOf('reality flickers') >= 0 ||
        update.indexOf('switched teams') >= 0
      )
    ) {
      Util.message(svgWrapperId, '🎤 FEEDBACK 🎤', {
        fontSize: '3em',
        messageColor: '#f40576',
      });
    } else if (
      update.indexOf('the electricity zaps') >= 0
    ) {
      Util.message(svgWrapperId, '⚡️ ZAP ⚡️', {
        fontSize: '3em',
        messageColor: '#f3c549',
      });
    } else if (
      update.indexOf('is now unstable') >= 0
    ) {
      Util.message(svgWrapperId, '🥴 UNSTABLE 🥴', {
        fontSize: '3em',
        messageColor: '#ffd734',
      });
    } else if (
      update.indexOf('the instability chains to') >= 0
    ) {
      Util.message(svgWrapperId, '🔗 INSTABILITY 🔗', {
        fontSize: '2.5em',
        messageColor: '#ced7e3',
      });
    } else if (
      update.indexOf('is now flickering') >= 0
    ) {
      Util.message(svgWrapperId, '', {
        fontSize: '3em',
        messageColor: '#62b2ff',
        blink: true,
        classes: { [diamondId]: 'flicker' },
      });
    } else if (
      this.game.maximumBlaseball
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
    if (this.game.inProgress) {
      return this.game?.getBaseRunner(baseIndex);
    }
    return null;
  }

  getPitcher() {
    if (this.game.inProgress) {
      return { id: this.game.pitcherId, name: this.game.pitcherName };
    }
    return null;
  }

  getBatter() {
    if (this.game.inProgress) {
      return { id: this.game.batterId, name: this.game.batterName };
    }
  }

  async openTeam(id: string, ev?: Event) {
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
        cssClass: 'app-game-detail',
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
