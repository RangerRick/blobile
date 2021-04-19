import { Entry, ID } from './_entry';

import { sha256 } from 'hash.js';
import { Player } from './player';

export class Game extends Entry {
  id: ID;
  atBatBalls: number;
  atBatStrikes: number;
  awayBalls: number;
  awayBases: number;
  awayBatter: string;
  awayBatterMod: string;
  awayBatterName: string;
  awayOdds: number;
  awayOuts: number;
  awayPitcher: ID;
  awayPitcherMod: string;
  awayPitcherName: string;
  awayScore: number;
  awayStrikes: number;
  awayTeam: ID;
  awayTeamBatterCount: number;
  awayTeamColor: string;
  /* awayTeamEmoji: string; */
  awayTeamName: string;
  awayTeamNickname: string;
  awayTeamSecondaryColor: string;
  /* baseRunnerMods: string[]; */
  /* baseRunnerNames: string[]; */
  /* baseRunners: ID[]; */
  baserunnerCount: number;
  /* basesOccupied: number[]; */
  bottomInningScore: number;
  day: number;
  finalized: boolean;
  gameComplete: boolean;
  gameStart: boolean;
  gameStartPhase: number;
  halfInningOuts: number;
  halfInningScore: number;
  homeBalls: number;
  homeBases: number;
  homeBatter: ID;
  homeBatterMod: string;
  homeBatterName: string;
  homeOdds: number;
  homeOuts: number;
  homePitcher: ID;
  homePitcherMod: string;
  homePitcherName: string;
  homeScore: number;
  homeStrikes: number;
  homeTeam: ID;
  homeTeamBatterCount: number;
  homeTeamColor: string;
  /* homeTeamEmoji: string; */
  homeTeamName: string;
  homeTeamNickname: string;
  homeTeamSecondaryColor: string;
  inning: number;
  isPostseason: boolean;
  isTitleMatch: boolean;
  lastUpdate: string;
  newInningPhase: number;
  /* outcomes: string[]; */
  phase: number;
  playCount: number;
  repeatCount: number;
  rules: ID;
  scoreLedger: string;
  scoreUpdate: string;
  season: number;
  seriesIndex: number;
  seriesLength: number;
  shame: boolean;
  stadiumId: ID;
  statsheet: ID;
  terminology: ID;
  topInningScore: number;
  topOfInning: boolean;
  tournament: number;
  weather: number;

  hash: string;

  constructor(data?: any) {
    super(data);

    this.defineStrings([
      'id',
      'awayBatter',
      'awayBatterMod',
      'awayBatterName',
      'awayPitcher',
      'awayPitcherMod',
      'awayPitcherName',
      'awayTeam',
      'awayTeamColor',
      'awayTeamName',
      'awayTeamNickname',
      'awayTeamSecondaryColor',
      'homeBatter',
      'homeBatterMod',
      'homeBatterName',
      'homePitcher',
      'homePitcherMod',
      'homePitcherName',
      'homeTeam',
      'homeTeamColor',
      'homeTeamName',
      'homeTeamNickname',
      'homeTeamSecondaryColor',
      'lastUpdate',
      'rules',
      'scoreLedger',
      'scoreUpdate',
      'stadiumId',
      'statsheet',
      'terminology',
    ]);
    this.defineNumbers([
      'atBatBalls',
      'atBatStrikes',
      'awayBalls',
      'awayBases',
      'awayOdds',
      'awayOuts',
      'awayScore',
      'awayStrikes',
      'awayTeamBatterCount',
      'baserunnerCount',
      'bottomInningScore',
      'gameStartPhase',
      'halfInningOuts',
      'halfInningScore',
      'homeBalls',
      'homeBases',
      'homeOdds',
      'homeOuts',
      'homeScore',
      'homeStrikes',
      'homeTeamBatterCount',
      'newInningPhase',
      'phase',
      'playCount',
      'repeatCount',
      'seriesIndex',
      'seriesLength',
      'topInningScore',
      'tournament',
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
      'isTitleMatch',
      'shame',
      'topOfInning',
    ]);

    const hash = sha256();
    for (const prop of this.hashKeys()) {
      hash.update(this.data?.[prop]);
    }
    this.hash = hash.digest('hex');
  }

  protected hashKeys() {
    return [
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
      'scoreUpdate',
      'topOfInning',
    ];
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

  public get awayTeamEmoji(): string {
    const s = Number(this.data?.awayTeamEmoji);
    return isNaN(s) ? this.data?.awayTeamEmoji : String.fromCodePoint(s);
  }

  public get homeTeamEmoji(): string {
    const s = Number(this.data?.homeTeamEmoji);
    return isNaN(s) ? this.data?.homeTeamEmoji : String.fromCodePoint(s);
  }

  public get inProgress() {
    return this.data?.gameStart && !this.data?.gameComplete;
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

  public get baseRunnerMods(): string[] {
    return this.data?.baseRunnerMods || [];
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

  public get winnerId(): string {
    if (this.homeScore < this.awayScore) {
      return this.awayTeam;
    } else if (this.homeScore > this.awayScore) {
      return this.homeTeam;
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

  public get loserId(): string {
    if (this.homeScore < this.awayScore) {
      return this.homeTeam;
    } else if (this.homeScore > this.awayScore) {
      return this.awayTeam;
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

  public get maximumBlaseball(): boolean {
    let balls: number, bases: number, outs: number, strikes: number;

    if (this.awayBatting) {
      balls = this.awayBalls;
      bases = this.awayBases;
      outs = this.awayOuts;
      strikes = this.awayStrikes;
    } else {
      balls = this.homeBalls;
      bases = this.homeBases;
      outs = this.homeOuts;
      strikes = this.homeStrikes;
    }

    return this.halfInningOuts === outs - 1
      && this.atBatBalls === balls - 1
      && this.atBatStrikes === strikes - 1
      && this.baserunnerCount === bases - 1;
  }

  public get updateText(): string {
    let ret = [];

    if (this.lastUpdate && this.lastUpdate.length > 0) {
      ret.push(this.lastUpdate.trim());
    }
    if (this.scoreUpdate && this.scoreUpdate.length > 0) {
      ret.push(this.scoreUpdate.trim());
    }

    return ret.join('\n');
  }
}
