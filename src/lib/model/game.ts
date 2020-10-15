import { Entry } from './_entry';

import { sha256 } from 'hash.js';
import { Player } from './player';

export class Game extends Entry {
  id: string;
  atBatBalls: number;
  atBatStrikes: number;
  awayBases: number;
  awayBatter: string;
  awayBatterName: string;
  awayOdds: number;
  awayPitcher: string;
  awayPitcherName: string;
  awayScore: number;
  awayStrikes: number;
  awayTeam: string;
  awayTeamBatterCount: number;
  awayTeamColor: string;
  awayTeamEmoji: string;
  awayTeamName: string;
  awayTeamNickname: string;
  baserunnerCount: number;
  day: number;
  finalized: boolean;
  gameComplete: boolean;
  gameStart: boolean;
  halfInningOuts: number;
  halfInningScore: number;
  homeBases: number;
  homeBatter: string;
  homeBatterName: string;
  homePitcher: string;
  homePitcherName: string;
  homeScore: number;
  homeStrikes: number;
  homeTeam: string;
  homeTeamBatterCount: number;
  homeTeamColor: string;
  homeTeamEmoji: string;
  homeTeamName: string;
  homeTeamNickname: string;
  inning: number;
  isPostseason: boolean;
  lastUpdate: string;
  phase: number;
  rules: string;
  season: number;
  seriesIndex: number;
  seriesLength: number;
  shame: boolean;
  statsheet: string;
  terminology: string;
  topOfInning: boolean;
  weather: number;

  hash: string;

  constructor(data?: any) {
    super(data);

    this.defineStrings([
      'id',
      'awayBatter',
      'awayBatterName',
      'awayPitcher',
      'awayPitcherName',
      'awayTeam',
      'awayTeamColor',
      'awayTeamEmoji',
      'awayTeamName',
      'awayTeamNickname',
      'homeBatter',
      'homeBatterName',
      'homePitcher',
      'homePitcherName',
      'homeTeam',
      'homeTeamColor',
      'homeTeamEmoji',
      'homeTeamName',
      'homeTeamNickname',
      'lastUpdate',
      'rules',
      'statsheet',
      'terminology',
    ]);
    this.defineNumbers([
      'atBatBalls',
      'atBatStrikes',
      'awayBases',
      'awayOdds',
      'awayScore',
      'awayStrikes',
      'awayTeamBatterCount',
      'baserunnerCount',
      'halfInningOuts',
      'halfInningScore',
      'homeBases',
      'homeScore',
      'homeStrikes',
      'homeTeamBatterCount',
      'phase',
      'seriesIndex',
      'seriesLength',
      'weather',
    ]);
    this.defineIncrementedNumbers([
      'day',
      'inning',
      'season',
    ]);
    this.defineBooleans([
      'finalized',
      'gameComplete',
      'gameStart',
      'isPostseason',
      'shame',
      'topOfInning',
    ]);

    const hash = sha256();
    for (const prop of [
      'awayBatter',
      'homeBatter',
      'lastUpdate',
      'atBatBalls',
      'atBatStrikes',
      'awayScore',
      'baserunnerCount',
      'halfInningOuts',
      'halfInningScore',
      'homeScore',
      'inning',
      'gameComplete',
      'gameStart',
      'topOfInning',
    ]) {
      hash.update(this.data?.[prop]);
    }
    this.hash = hash.digest('hex');
  }

  public get awayBatting() {
    return this.topOfInning;
  }
  public get homeBatting() {
    return !this.topOfInning;
  }
  public get awayPitching() {
    return !this.topOfInning;
  }
  public get homePitching() {
    return this.topOfInning;
  }
  public get fifthBaseActive() {
    if (this.homeBatting) {
      return this.homeBases === 5;
    } else {
      return this.awayBases === 5;
    }
  }

  public get bases() {
    return this.homeBatting ? this.homeBases : this.awayBases;
  }

  public get strikes() {
    return this.homeBatting ? this.homeStrikes : this.awayStrikes;
  }

  public get pitcherId() {
    return this.homeBatting ? this.awayPitcher : this.homePitcher;
  }

  public get pitcherName() {
    return this.homeBatting ? this.awayPitcherName : this.homePitcherName;
  }

  public get batterId() {
    return this.homeBatting ? this.homeBatter : this.awayBatter;
  }

  public get batterName() {
    return this.homeBatting ? this.homeBatterName : this.awayBatterName;
  }

  public get baseRunnerNames(): string[] {
    return this.data?.baseRunnerNames || [];
  }

  public get baseRunners(): string[] {
    return this.data?.baseRunners || [];
  }

  public get basesOccupied(): number[] {
    return this.data?.basesOccupied || [];
  }

  public get outcomes(): string[] {
    return this.data?.outcomes || [];
  }

  /** 0-indexed */
  public getBaseRunner(baseIndex: number): Player {
    for (let i = 0; i < this.data?.basesOccupied?.length || 0; i++) {
      if (this.data?.basesOccupied[i] === baseIndex) {
        return {
          id: this.data.baseRunners[i],
          name: this.data.baseRunnerNames[i],
        } as Player;
      }
    }
    return undefined;
  }

  public get winner(): string {
    if (this.homeScore < this.awayScore) {
      return this.awayTeamName;
    } else if (this.homeScore > this.awayScore) {
      return this.homeTeamName;
    }
    return undefined;
  }

  public get loser(): string {
    if (this.homeScore < this.awayScore) {
      return this.homeTeamName;
    } else if (this.homeScore > this.awayScore) {
      return this.awayTeamName;
    }
    return undefined;
  }

  public get winningScore(): number {
    return Math.max(this.homeScore, this.awayScore);
  }

  public get losingScore(): number {
    return Math.min(this.homeScore, this.awayScore);
  }
}
