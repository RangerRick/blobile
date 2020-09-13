import { Entry } from './_entry';
import { AngularDelegate } from '@ionic/angular';

export class Matchup extends Entry {
  public id: string;
  // public name: any;
  public awaySeed: number;
  public awayTeam: string;
  public awayWins: number;
  public homeSeed: number;
  public homeTeam: string;
  public homeWins: number;

  constructor(data?: any) {
    super(data);

    this.defineStrings(['id', 'awayTeam', 'homeTeam']);
    this.defineNumbers(['awaySeed', 'awayWins', 'homeSeed', 'homeWins']);
  }
}