import { Entry } from './_entry';

export class Playoffs extends Entry {
  public get id(): string {
    return this.data?.id;
  }

  public get name(): string {
    return this.data?.name;
  }

  public get numberOfRounds() {
    return this.incremented('numberOfRounds');
  }

  public get playoffDay() {
    return this.incremented('playoffDay');
  }

  public get rounds(): string[] {
    return this.data?.rounds || [];
  }

  public get season() {
    return this.incremented('season');
  }

  public get tomorrowRound() {
    return this.incremented('tomorrowRound');
  }

  public get winner(): string {
    return this.data?.winner;
  }
}
