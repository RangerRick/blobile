import { Entry } from './_entry';

export interface Countdown {
  hours: number,
  minutes: number,
  seconds: number,
}

export class Sim extends Entry {
  day: number;
  phase: number;

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

  public isRegularSeason() {
    return this.data?.day !== undefined? (this.data.day < 99) : false;
  }

  public isPostseason() {
    return this.data?.day !== undefined? (this.data.day >= 99) : false;
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

    return false;
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

  public get nextSeasonStart() {
    return this.data.nextSeasonStart ? new Date(this.data.nextSeasonStart) : undefined;
  }

  public get nextPhaseTime() {
    return this.data.nextPhaseTime ? new Date(this.data.nextPhaseTime) : undefined;
  }

  public get nextElectionEnd() {
    return this.data.nextElectionEnd ? new Date(this.data.nextElectionEnd) : undefined;
  }
}