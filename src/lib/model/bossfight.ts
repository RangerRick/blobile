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
  awayMaxHp: string;
  homeHp: string;
  homeMaxHp: string;
  repeatCount: number;

  constructor(data?: any) {
    super(data);

    this.defineStrings([
      'awayHp',
      'awayMaxHp',
      'homeHp',
      'homeMaxHp',
    ]);

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
