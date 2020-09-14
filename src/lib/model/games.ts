import { Sim } from './sim';
import { Season } from './season';
import { Standings } from './standings';
import { Postseason } from './postseason';
import { Game } from './game';
import { Entry } from './_entry';

export class Games extends Entry {
  public get sim(): Sim {
    return new Sim(this.data?.sim);
  }

  public get season(): Season {
    return new Season(this.data?.season);
  }

  public get standings(): Standings {
    return new Standings(this.data?.standings);
  }

  public get schedule(): Game[] {
    return this.data?.schedule?.map((game: any) => new Game(game)) || [];
  }

  public get tomorrowSchedule(): Game[] {
    return this.data?.tomorrowSchedule?.map((game: any) => new Game(game)) || [];
  }

  public get postseason(): Postseason {
    return new Postseason(this.data?.postseason);
  }

  private isPreseason(now = Date.now()) {
    const nextSeason = new Date(this.sim?.data?.nextSeasonStart).getTime();
    // console.debug(`nextSeason=${nextSeason}, now=${now}`);
    if (this.sim.day <= 1 && nextSeason > now) {
      return true;
    }

    return false;
  }

  public isRegularSeason(now = Date.now()) {
    return !this.isPreseason(now) && (this.sim.day !== undefined ? (this.sim.day < 100) : false);
  }

  public isPostseason(now = Date.now()) {
    return this.schedule.find((game: Game) => game.isPostseason) !== undefined;
  }

  public isPostseasonComplete(now = Date.now()) {
    if (this.isPreseason(now)) {
      return true;
    }

    if (this.sim?.data?.nextElectionEnd && this.sim?.data?.nextPhaseTime) {
      if (this.sim.data.nextElectionEnd === this.sim.data.nextPhaseTime) {
        return true;
      }
    }

    if (this.sim.phase === 0) {
      return true;
    }

    if (this.postseason?.matchups?.length === 1) {
      const matchup = this.postseason.matchups[0];
      if (matchup.homeWins >= 3 || matchup.awayWins >= 3) {
        if (this.postseason?.tomorrowMatchups?.length === 1) {
          const tomorrowMatchup = this.postseason.tomorrowMatchups[0];
          if (matchup.id === tomorrowMatchup.id) {
            return true;
          }
        }
      }
    }

    return false;
  }

}
