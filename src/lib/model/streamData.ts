import { Entry } from './_entry';

import { Fights } from './fights';
import { Games } from './games';
import { Leagues } from './leagues';
import { Postseason } from './postseason';
import { Round } from './round';
import { Playoffs } from './playoffs';
import { Season } from './season';
import { Sim } from './sim';
import { PHASES } from './phases';
import { BossFight } from './bossfight';

export class StreamData extends Entry {
  _blMetadata: { [key: string]: any };

  public get seasonNumber() {
    if (this.sim.day === 1 && this.games.isPostseasonComplete() && !this.games.isRegularSeason()) {
      return this.season.seasonNumber - 1;
    }
    return this.season.seasonNumber;
  }

  public get fights() {
    return new Fights(this.data?.fights);
  }

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

  //public get blMetadata() {
    //return this._blMetadata || {};
  //}

  //public set blMetadata(metadata: any) {
    //this._blMetadata = metadata;
  //}

  public phase(now = Date.now()): PHASES {
    /*  ¯\_(ツ)_/¯
    const bossFights = this.fights?.bossFights || [];
    const bossFightStarted = bossFights.reduce((started: boolean, fight: BossFight) => {
      return started || fight.gameStart;
    }, false);
    if (bossFightStarted) {
      return PHASES.BOSS_FIGHT;
    }
    */

    return this.games.gamePhase();
  }

}
