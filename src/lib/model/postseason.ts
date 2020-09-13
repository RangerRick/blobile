import { Entry } from './_entry';
import { Matchup } from './matchup';
import { Playoffs } from './playoffs';
import { Round } from './round';

export class Postseason extends Entry {

  public get playoffs() {
    return new Playoffs(this.data?.playoffs);
  }

  public get round() {
    return new Round(this.data?.round);
  }

  public get matchups(): Matchup[] {
    return this.data?.matchups?.map((matchup:any) => new Matchup(matchup)) || [];
  }

  public get tomorrowMatchups(): Matchup[] {
    return this.data?.tomorrowMatchups?.map((matchup:any) => new Matchup(matchup)) || [];
  }
}