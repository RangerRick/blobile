import { sha256 } from 'hash.js';
import { Game } from './game';
import { ID } from './_entry';

interface damageResult {
  dmg: number;
  dmgType: number;
  playerSource: ID;
  teamTarget: ID;
}

export class BossFight extends Game {
  awayHp: string;
  awayHpNum: number;
  awayMaxHp: string;
  awayMaxHpNum: number;
  homeHp: string;
  homeHpNum: number;
  homeMaxHp: string;
  homeMaxHpNum: number;
  repeatCount: number;

  constructor(data?: any) {
    super(data);

    const hp = [
      'awayHp',
      'awayMaxHp',
      'homeHp',
      'homeMaxHp',
    ];
    this.defineStrings(hp);

    for (const prop of hp) {
      if (data && data[prop]) {
        this[`${prop}Num`] = parseInt(data[prop], 10);
      }
    }
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
      'topOfInning',
      'awayHp',
      'awayMaxHp',
      'homeHp',
      'homeMaxHp',
    ];
  }

  public get awayHitPercent() {
    return 0.5;
    return this.awayHpNum / this.awayMaxHpNum;
  }

  public get homeHitPercent() {
    return 0.8;
    return this.homeHpNum / this.homeMaxHpNum;
  }

  // "damageResults": "[{\"dmgType\":5,\"teamTarget\":\"40b9ec2a-cb43-4dbb-b836-5accb62e7c20\",\"playerSource\":\"04e14d7b-5021-4250-a3cd-932ba8e0a889\",\"dmg\":382}]",
  public get damageResults(): damageResult[] {
    if (this.data?.damageResults) {
      try {
        return JSON.parse(this.data?.damageResults) as damageResult[];
      } catch (err) {
        console.error('Unable to parse damage results:', err);
      }
    }
    return [];
  }
}
