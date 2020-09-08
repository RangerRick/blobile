import { Games } from './games';
import { Leagues } from './leagues';
import { Entry } from './_entry';
import { Postseason } from './postseason';
import { Round } from './round';
import { Playoffs } from './playoffs';
import { Season } from './season';
import { Sim } from './sim';

export class StreamData extends Entry {
  public get games() {
    return new Games(this.data?.games);
  }

  public get leagues() {
    return new Leagues(this.data?.leagues);
  }

  /* shortcuts */
  public get season() {
    if (this.data?.games?.season) {
      return new Season(this.data.games.season);
    }
    return undefined;
  }

  public get sim() {
    if (this.data?.games?.sim) {
      return new Sim(this.data.games.sim);
    }
    return undefined;
  }

  public get postseason() {
    if (this.data?.games?.postseason) {
      return new Postseason(this.data.games.postseason);
    }
    return undefined;
  }

  public get round() {
    if (this.data?.games?.postseason?.round) {
      return new Round(this.data.games.postseason.round);
    }
    return undefined;
  }

  public get playoffs() {
    if (this.data?.games?.postseason?.playoffs) {
      return new Playoffs(this.data.games.postseason.playoffs);
    }
  }
}