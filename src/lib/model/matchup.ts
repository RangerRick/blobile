import { Entry, ID } from './_entry';

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
    this.defineNumbers(['awayWins', 'homeWins']);
    this.defineIncrementedNumbers(['awaySeed', 'homeSeed'])
  }

  public get gamesNeeded() {
    return this.data?.gamesNeeded === undefined? -1 : parseInt(this.data.gamesNeeded, 10);
  }
}
