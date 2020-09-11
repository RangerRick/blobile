import { Entry } from './_entry';

import { sha256 } from 'hash.js';

export class Game extends Entry {
  id: string;
  atBatBalls: number;
  atBatStrikes: number;
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
  baseRunnerCount: number;
  day: number;
  finalized: boolean;
  gameComplete: boolean;
  gameStart: boolean;
  halfInningOuts: number;
  halfInningScore: number;
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
  statshieet: string;
  terminology:string;
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
      'awayOdds',
      'awayScore',
      'awayStrikes',
      'awayTeamBatterCount',
      'baseRunnerCount',
      'halfInningOuts',
      'halfInningScore',
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
      'topOfInning',
    ]);

    let hash = sha256();
    for (const prop of [
      'awayBatter',
      'homeBatter',
      'lastUpdate',
      'atBatBalls',
      'atBatStrikes',
      'awayScore',
      'baseRunnerCount',
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
}