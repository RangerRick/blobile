import { PHASES } from './phases';
import { Entry } from './_entry';

export interface Countdown {
  diff: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export class Sim extends Entry {
  public id: string;
  public day: number;
  public eraColor: string;
  public eraTitle: string;
  public league: string;
  public playoffs: string;
  public playOffRound: number;
  public rules: string;
  public season: number;
  public seasonId: string;
  public subEraColor: string;
  public subEraTitle: string;
  public terminology: string;

  constructor(data?: any) {
    super(data);

    this.defineStrings([
      'eraColor',
      'eraTitle',
      'id',
      'league',
      'playoffs',
      'rules',
      'seasonId',
      'subEraColor',
      'subEraTitle',
      'terminology',
    ]);

    this.defineIncrementedNumbers([
      'day',
      'playOffRound',
      'season',
    ]);
  }

  public get phase(): PHASES {
    return this.data?.phase || 0;
  }

  public get showStandings(): boolean {
    switch (this.phase) {
      case PHASES.REGULAR_SEASON:
      case PHASES.PRE_OFFSEASON:
      case PHASES.OFFSEASON:
        return true;
      default:
        return false;
    }
  }

  countdownToNextPhase(from?: number) {
    const start = from || Date.now();
    const end = new Date(this.data.nextPhaseTime).getTime();

    const diff = Math.floor((end - start) / 1000.0); // drop millis
    if (diff < 0) {
      return {
        diff,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }

    const ret = {
      diff,
      hours: Math.floor(diff / 60 / 60),
    } as Countdown;

    const remainder = diff - (ret.hours * 60 * 60);
    ret.minutes = Math.floor(remainder / 60);
    ret.seconds = remainder - (ret.minutes * 60);
    return ret;
  }

  countdownToNextSeason(from?: number) {
    const start = from || Date.now();
    const end = new Date(this.data.nextSeasonStart).getTime();

    const diff = Math.floor((end - start) / 1000.0); // drop millis
    if (diff < 0) {
      return {
        diff,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }

    const ret = {
      diff,
      hours: Math.floor(diff / 60 / 60),
    } as Countdown;

    const remainder = diff - (ret.hours * 60 * 60);
    ret.minutes = Math.floor(remainder / 60);
    ret.seconds = remainder - (ret.minutes * 60);
    return ret;
  }

  public get nextSeasonStart(): Date | undefined {
    return this.data.nextSeasonStart ? new Date(this.data.nextSeasonStart) : undefined;
  }

  public get nextPhaseTime(): Date | undefined {
    return this.data.nextPhaseTime ? new Date(this.data.nextPhaseTime) : undefined;
  }

  public get nextElectionEnd(): Date | undefined {
    return this.data.nextElectionEnd ? new Date(this.data.nextElectionEnd) : undefined;
  }
}
