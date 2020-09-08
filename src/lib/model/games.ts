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
    return this.data?.schedule?.map((game:any) => new Game(game)) || [];
  }

  public get tomorrowSchedule(): Game[] {
    return this.data?.tomorrowSchedule?.map((game:any) => new Game(game)) || [];
  }

  public get postseason(): Postseason {
    return new Postseason(this.data?.postseason);
  }
}
