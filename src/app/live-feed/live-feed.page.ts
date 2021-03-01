import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { LoadingController, IonContent, Platform } from '@ionic/angular';

import { Plugins } from '@capacitor/core';

import { Subscription } from 'rxjs';

import Marquee from '@egstad/marquee/src';

import { APIStream } from '../../lib/api/stream';
import { SettingsService, SEGMENT } from '../../lib/settings.service';

import { StreamData } from '../../lib/model/streamData';
import { Game } from '../../lib/model/game';
import { Team } from '../../lib/model/team';

import { GlobalEvent } from 'src/lib/model/globalEvent';
import { APIDatabase } from 'src/lib/api/database';
import { Countdown } from 'src/lib/model/sim';
import { PHASES } from 'src/lib/model/phases';

@Component({
  selector: 'app-live-feed',
  templateUrl: 'live-feed.page.html',
  styleUrls: ['live-feed.page.scss']
})
export class LiveFeedPage implements OnInit, OnDestroy {
  @ViewChild(IonContent, { static: false }) content: IonContent;

  public streamData = new StreamData({});
  public games = [] as Game[];
  public searchTerm: string;
  public segment = 'all' as SEGMENT;

  // protected loading: HTMLIonLoadingElement;
  public loading: boolean;
  public ready = false;
  public errors = 0;
  // public lastUpdate = "look, it's been a while, OK?";
  public lastUpdate = Date.now();
  public filterVisible = false;
  public stale = false;
  public staleThreshold = 30 * 1000; // 30s

  private subscription: Subscription;

  private clockUpdater: number;
  public countdown: Countdown;
  public globalEvents: GlobalEvent[];
  private keepAwake = false;
  public phase: PHASES;
  public PHASES = PHASES;
  public uiState = {} as { [key: string]: any };

  constructor(
    private stream: APIStream,
    private database: APIDatabase,
    public loadingController: LoadingController,
    private platform: Platform,
    protected settings: SettingsService) {
  }

  private get schedule(): Game[] {
    return this.streamData?.games?.schedule || [];
  }

  async ngOnInit() {
    await this.platform.ready();
    await this.settings.ready;

    console.debug('LiveFeed.ngOnInit()');
    this.showLoading();

    this.segment = this.settings.segment();
    await this.startListening();
    return true;
  }

  async ngOnDestroy() {
    this.ready = false;
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = undefined;
    }
    return true;
  }

  async scrollToTop() {
    this.content.scrollToTop();
  }

  async showLoading() {
    this.loading = true;
  }

  async hideLoading() {
    this.loading = false;
    this.ready = true;
  }

  forceRefresh(evt: any) {
    setTimeout(() => {
      this.stream.retry().finally(() => {
        evt?.target?.complete();
      });
    }, 500);
  }

  toggleSearchbar() {
    this.filterVisible = !this.filterVisible;
    console.debug(`LiveFeed.toggleSearchbar(): filterVisible=${this.filterVisible}`);
  }

  filterList(evt: any) {
    this.searchTerm = evt.srcElement.value;
    return this.refreshUI();
  }

  getActiveGames(): Game[] {
    if (this.streamData?.games?.schedule) {
      return this.streamData.games.schedule.filter((game: Game) => {
        return game.inProgress;
      });
    }
    return [];
  }

  getActiveGameCount(): number {
    return this.getActiveGames().length;
  }

  getFavoriteGames(): Game[] {
    if (this.streamData?.games?.schedule) {
      return this.streamData?.games?.schedule.filter((game: Game) => {
        return this.settings.isFavorite(game.homeTeam) || this.settings.isFavorite(game.awayTeam);
      });
    }
    return [];
  }

  getSegmentGames(): Game[] {
    console.debug('LiveFeed.getSegmentGames()');

    let ret = [] as Game[];
    switch (this.segment) {
      case 'all':
        ret = this.streamData?.games?.schedule || [];
        break;
      case 'active':
        ret = this.getActiveGames();
        break;
      case 'favorites':
        ret = this.getFavoriteGames();
        break;
      default:
        console.warn(`LiveFeed.getSegmentGames(): unhandled segment: ${this.segment}`);
        ret = [];
        break;
    }

    // return [ret[0]];

    const favoriteTeam = this.settings.favoriteTeam();
    return ret.sort((a: Game, b: Game) => {
      // always put favorite team first
      if (a.homeTeam === favoriteTeam || a.awayTeam === favoriteTeam) {
        return -1;
      } else if (b.homeTeam === favoriteTeam || b.awayTeam === favoriteTeam) {
        return 1;
      }

      if (this.settings.isFavorite(a.homeTeam) || this.settings.isFavorite(a.awayTeam)) {
        return -1;
      } else if (this.settings.isFavorite(b.homeTeam) || this.settings.isFavorite(b.awayTeam)) {
        return 1;
      }

      const nameA = a.homeTeamNickname;
      const nameB = b.homeTeamNickname;
      return (nameA < nameB) ? -1 : (nameA > nameB) ? 1 : 0;
    });
  }

  doCountdown(type: string) {
    if (!this.clockUpdater) {
      this.clockUpdater = setInterval(() => {
        this.countdown = this.streamData.sim[type]();
      }, 1000) as unknown as number;
    }
  }

  getWinner() {
    const winner = this.streamData?.games?.postseason?.playoffs?.winner;
    if (winner) {
      const team = this.streamData.leagues.teams.find((team: Team) => team.id === winner);
      console.debug('getWinner():', team);
      return team;
    }
    return undefined;
  }

  getPlayoffDay() {
    return (this.streamData?.games?.postseason?.playoffs?.playoffDay || 0);
  }

  getCountdown() {
    return `${this.countdown.hours} ${this.countdown.hours === 1 ? 'hour' : 'hours'}, ${this.countdown.minutes} ${this.countdown.minutes === 1 ? 'minute' : 'minutes'}, ${this.countdown.seconds} ${this.countdown.seconds === 1 ? 'second' : 'seconds'}`;
  }

  refreshUI(): Game[] {
    console.debug('LiveFeed.refreshUI()');

    let ret = this.getSegmentGames();

    if (this.searchTerm && this.searchTerm.length >= 2) {
      // search term is long enough, filter based on team names
      ret = ret.filter((game: any) => {
        return game.homeTeamName.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1
          || game.awayTeamName.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1;
      });
    }

    this.games = ret;
    return this.games;
  }

  segmentChanged(evt: any) {
    if (evt && evt.detail && evt.detail.value) {
      this.segment = evt.detail.value;
      this.settings.setSegment(this.segment);
    }
    console.debug('LiveFeed.segmentChanged():', evt);
    this.refreshUI();
  }

  checkStale() {
    const current = this.stale;
    if (this.games && this.games.length > 0) {
      const active = this.games.find(game => game.inProgress);
      if (active) {
        // there are still active games, check staleness based on the last update received
        if (this.lastUpdate + this.staleThreshold < Date.now()) {
          this.stale = true;
        } else {
          this.stale = false;
        }
      } else {
        // all active games have completed
        this.stale = false;
        // const percent = Math.round(Date.now() % (60 * 60 * 1000) / (60 * 60 * 1000)); // how far through the hour are we?
      }
    }

    console.debug(`LiveFeed.checkStale(): ${current} -> ${this.stale}`);
  }

  checkDisableSleep() {
    console.debug('LiveFeed.checkDisableSleep()');
    const disableSleep = this.settings.disableSleep();

    if (!Plugins.KeepAwake) {
      return;
    }

    try {
      if (disableSleep && this.getActiveGameCount() > 0) {
        if (!this.keepAwake) {
          console.debug('LiveFeed.checkDisableSleep(): keeping awake');
          this.keepAwake = true;
          Plugins.KeepAwake.keepAwake();
        }
      } else {
        if (this.keepAwake) {
          console.debug('LiveFeed.checkDisableSleep(): allowing sleep');
          this.keepAwake = false;
          Plugins.KeepAwake.allowSleep();
        }
      }
    } catch (err) {
      console.error('An error occurred setting keep-awake status.', err);
    }
  }

  async onEvent(value: StreamData|ErrorEvent) {
    console.debug('LiveFeed.onEvent()');
    if (value && value instanceof ErrorEvent) {
      console.warn('LiveFeed.onEvent(): got an error:', value);
      this.onError(value);
      return;
    }

    const streamData = value as StreamData;

    this.lastUpdate = Date.now();
    console.debug('LiveFeed.lastUpdate()', this.lastUpdate);
    setTimeout(() => {
      this.errors = 0;
      this.checkStale();
    }, 1000);

    for (const key of Object.keys(streamData.data)) {
      this.streamData.data[key] = streamData.data[key];
    }

    console.debug('LiveFeed.onEvent(): current data:', this.streamData);

    this.onUpdate();
  }

  onError(evt: Event) {
    console.debug('LiveFeed.onError():', evt);
    this.onUpdate();
    // wait a couple of seconds before actually marking it as an error
    setTimeout(() => {
      this.errors++;
      this.checkStale();
    }, 1000);
  }

  async onUpdate() {
    this.checkDisableSleep();
    this.refreshUI();

    const uiState = {
      seasonHeader: undefined,
      notice: undefined,
      countdownNotice: undefined,
      winner: undefined,
    };

    if (!this.streamData && !this.streamData.sim) {
      return;
    }

    const day = this.streamData?.games?.sim?.day;
    const round = this.streamData?.sim?.playOffRound;
    const phase = this.streamData?.sim?.phase;

    switch (phase) {
      case PHASES.REST:
      case PHASES.PRESEASON:
      case PHASES.POSTSEASON_END:
      case PHASES.ELECTION:
      {
        this.doCountdown('countdownToNextPhase');
        uiState.notice = 'Games have finished for the season.';
        uiState.countdownNotice = 'Next season starts in:';
        uiState.winner = this.getWinner();
        break;
      }

      case PHASES.SEASON_END:
      case PHASES.PRE_POSTSEASON:
      {
        this.doCountdown('countdownToNextPhase');
        uiState.notice = `Regular Season ${this.streamData.seasonNumber} is over.`;
        uiState.countdownNotice = `Earlpostseason starts in:`;
        break;
      }

      case PHASES.EARLY_POSTSEASON_END:
      {
        this.doCountdown('countdownToNextPhase');
        uiState.notice = 'Earlpostseason is over.';
        uiState.countdownNotice = 'Latepostseason starts in:';
        break;
      }
      case PHASES.EARLY_POSTSEASON:
      {
        uiState.seasonHeader = `Earlpostseason, Day ${day}`;
        break;
      }
      case PHASES.POSTSEASON:
      {
        uiState.seasonHeader = `Postseason Round ${this.streamData.games.sim.playOffRound}, Day ${day}`;
        break;
      }
      case PHASES.EARLSEASON:
      {
        uiState.seasonHeader = `Earlseason Round ${this.streamData.games.sim.playOffRound}, Day ${day}`;
        break;
      }
      case PHASES.MIDSEASON:
      {
        uiState.seasonHeader = `Midseason Round ${this.streamData.games.sim.playOffRound}, Day ${day}`;
        break;
      }
      default:
        uiState.seasonHeader = `Season ${this.streamData?.games?.season?.seasonNumber}, Day ${day}`;
        break;
    }

    if (!this.uiState.notice && this.clockUpdater) {
      clearInterval(this.clockUpdater);
      this.clockUpdater = undefined;
      this.countdown = undefined;
    }

    this.phase = phase;
    Object.assign(this.uiState, uiState);

    this.hideLoading();
  }

  async startListening() {
    console.debug('LiveFeed.startListening(): opening event stream to blaseball.com');
    this.showLoading();

    this.subscription?.unsubscribe();
    this.subscription = await this.stream.subscribe((evt) => {
      this.onEvent(evt);
    }, (err) => {
      this.onError(err);
    });

    this.database.globalEvents().then((events: GlobalEvent[]) => {
      this.globalEvents = events.filter((event: GlobalEvent) => event.expire === null);

      setTimeout(() => {
        const elem = document.getElementById('marquee');
        if (elem) {
          const marquee = new Marquee(elem);
          setTimeout(() => {
            elem.setAttribute('style', 'visibility: visible');
          }, 200);
        }
      }, 1000);
    });
  }

  gameId(index: number, item: any): string {
    if (item && item.id) {
      return item.id;
    }
    return String(index);
  }
}
