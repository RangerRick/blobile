import { Entry, ID } from './_entry';
import { AngularDelegate } from '@ionic/angular';

export class Matchup extends Entry {
  public id: ID;
  // public name: any;
  public awaySeed: number;
  public awayTeam: ID;
  public awayWins: number;
  public homeSeed: number;
  public homeTeam: ID;
  public homeWins: number;

  constructor(data?: any) {
    super(data);

    this.defineStrings(['id', 'awayTeam', 'homeTeam']);
    this.defineNumbers(['awaySeed', 'awayWins', 'homeSeed', 'homeWins']);
  }
}
