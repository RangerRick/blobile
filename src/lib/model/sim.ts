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

  public isPreseason(now = Date.now()) {
    const nextSeason = new Date(this.data.nextSeasonStart).getTime();
    console.debug(`nextSeason=${nextSeason}, now=${now}`);
    if (this.data.day === 0 && nextSeason > now) {
      return true;
    }
  }

  public isRegularSeason(now = Date.now()) {
    return !this.isPreseason(now) && (this.data?.day !== undefined? (this.data.day < 99) : false);
  }

  public isPostseason(now = Date.now()) {
    return !this.isPreseason(now) && (this.data?.day !== undefined? (this.data.day >= 99) : false);
  }

  public isPostseasonComplete(now = Date.now()) {
    if (this.data.nextElectionEnd && this.data.nextPhaseTime) {
      if (this.data.nextElectionEnd === this.data.nextPhaseTime) {
        return true;
      }
    }

    if (this.phase === 0) {
      return true;
    }

    return this.isPreseason(now);
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