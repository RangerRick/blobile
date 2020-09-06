import { Entry } from './_entry';

export class League extends Entry {
  public get id(): string {
    return this.data?.id;
  }

  public get name(): string {
    return this.data?.name;
  }

  public get subleagues(): string[] {
    return this.data?.subleagues || [];
  }

  public get tiebreakers(): string {
    return this.data?.tiebreakers;
  }
}