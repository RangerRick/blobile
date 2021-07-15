import { Entry, ID } from './_entry';

export class Playoffs extends Entry {
  public get id(): ID {
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

  public get rounds(): ID[] {
    return this.data?.rounds || [];
  }

  public get season() {
    return this.incremented('season');
  }

  public get tomorrowRound() {
    return this.incremented('tomorrowRound');
  }

  public get winner(): ID {
    return this.data?.winner;
  }

  public get round() {
    return this.incremented('round');
  }
}
