import { Sim } from './sim';
import { Season } from './season';
import { Standings } from './standings';
import { Postseason } from './postseason';
import { Game } from './game';
import { Entry, ID } from './_entry';
import { Matchup } from './matchup';
import { PHASES } from './phases';
import { Tournament } from './tournament';

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

  public get tournament(): Tournament {
    return new Tournament(this.data?.tournament);
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

  private startedGames(games: Game[]) {
    return games.filter((game: Game) => game.gameStart);
  }

  private incompleteGames(games: Game[]) {
    return games.filter((game: Game) => !game.gameComplete);
  }

  public dayStarted(): boolean {
    return this.schedule.find((game: Game) => game.gameStart) !== undefined;
  }

  public dayComplete(): boolean {
    return this.schedule.find((game: Game) => !game.gameComplete) === undefined;
  }

  public gamePhase(now = Date.now()): PHASES {
    const sim = this.sim;
    const day = sim?.day || -1;

    return sim.phase;

    /*
    const schedule = this.schedule;

    const nextSeason = sim?.nextSeasonStart;

    if (day <= 1 && nextSeason.getTime() > now) {
      return PHASES.PRESEASON;
    }

    if (day >= 0 && day < 100) {
      if (day === 99 && this.dayComplete()) {
        // if it's still day 99, but all game are done, we're pre-wildcard
        return PHASES.OFFSEASON;
      }

      // otherwise we're still regular season
      return PHASES.EARLSEASON;
    }

    const activeGames = schedule.filter((game: Game) => !game.gameComplete);

    // if we're not preseason, and we're not regular season, this _must_ be postseason

    // if we're on day 100, and the day hasn't started yet, we're pre-wildcard
    if (this.sim.day === 100 && !this.dayStarted()) {
      return PHASES.OFFSEASON;
    }
    // otherwise, we're at least wildcard... continue

    const postseason = this.postseason;
    const playoffs = postseason?.playoffs;
    const round = postseason?.round;

    // round 1 is wildcard
    if (sim.playOffRound < 2) {
      if (this.dayComplete() && playoffs.tomorrowRound === 2) {
        return PHASES.POST_WILDCARD;
      }
      return PHASES.WILDCARD;
    }

    // round 2+ is playoffs

    // if we have a single winner, and it matches the playoffs winner, we're done!
    const winners = round?.winners?.filter((id: ID) => id !== 'none');
    if (
      winners.length === 1
      && playoffs.winner === winners[0]
    ) {
      return PHASES.PRESEASON;
    }

    const tomorrowRound = playoffs.tomorrowRound;
    const matchupWins = postseason.matchups.reduce((total: number, matchup: Matchup) => {
      return total + matchup.awayWins + matchup.homeWins;
    }, 0);

    console.debug('tomorrowRound=', tomorrowRound);
    console.debug('activeGames=', activeGames.length);
    console.debug('matchupWins=', matchupWins);

    if (
      tomorrowRound === 2
      && activeGames.length === 0
      &&  matchupWins === 0
    ) {
      return PHASES.POST_WILDCARD;
    }

    return PHASES.POSTSEASON;
    */
  }

  public isPostseason(now = Date.now()) {
    if (this.schedule.find((game: Game) => game.isPostseason) !== undefined) {
      // the schedule has postseason games
      return true;
    }

    const incompleteRegularSeason = this.incompleteGames(this.schedule)
      .filter((game: Game) => !game.isPostseason);

    // console.debug('incomplete games', incompleteRegularSeason);
    // console.debug('sim', this.sim);
    if (incompleteRegularSeason.length === 0) {
      if (this.sim.day === 99) {
        // no games are left for day 99
        return true;
      }
      if (this.tomorrowSchedule.find((game: Game) => game.isPostseason) !== undefined) {
        // there are postseason games tomorrow
        return true;
      }
    }

    return false;
  }

  public isPostseasonComplete(now = Date.now()) {
    if (this.isPreseason(now)) {
      return true;
    }

    if (!this.isPostseason()) {
      // no postseason games in the schedule
    }

    const incompleteRegularSeasonGames = this.schedule.find((game: Game) => {
      return !game?.isPostseason && !game?.gameComplete;
    });


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
