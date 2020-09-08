import { Entry } from './_entry';

export interface Countdown {
  hours: number,
  minutes: number,
  seconds: number,
}

export class Sim extends Entry {
  public id: string;
  public day: number;
  public eraColor: string;
  public eraTitle: string;
  public league: string;
  public phase: number;
  public playoffs: string;
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
      'playoffRound',
      'season',
    ]);

    this.defineNumbers([
      'phase',
    ]);
  }

  public isPreseason() {
    const nextSeason = new Date(this.data.nextSeasonStart).getTime();
    if (this.data.day === 0 && nextSeason > Date.now()) {
      return true;
    }
  }

  public isRegularSeason() {
    return !this.isPreseason() && this.data?.day !== undefined? (this.data.day < 99) : false;
  }

  public isPostseason() {
    return !this.isPreseason() && this.data?.day !== undefined? (this.data.day >= 99) : false;
  }

  public isPostseasonComplete() {
    if (this.data.nextElectionEnd && this.data.nextPhaseTime) {
      if (this.data.nextElectionEnd === this.data.nextPhaseTime) {
        return true;
      }
    }

    if (this.phase === 0) {
      return true;
    }

    return this.isPreseason();
  }

  countdownToNextPhase(from?: number) {
    const start = from || Date.now();
    const end = new Date(this.data.nextPhaseTime).getTime();

    const diff = Math.floor((end - start) / 1000.0); // drop millis

    const ret = {
      hours: Math.floor(diff / 60 / 60),
    } as Countdown;

    let remainder = diff - (ret.hours * 60 * 60);
    ret.minutes = Math.floor(remainder / 60);
    ret.seconds = remainder - (ret.minutes * 60);
    return ret;
  }

  countdownToNextSeason(from?: number) {
    const start = from || Date.now();
    const end = new Date(this.data.nextSeasonStart).getTime();

    const diff = Math.floor((end - start) / 1000.0); // drop millis

    const ret = {
      hours: Math.floor(diff / 60 / 60),
    } as Countdown;

    let remainder = diff - (ret.hours * 60 * 60);
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