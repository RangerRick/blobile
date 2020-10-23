import { Entry, ID } from './_entry';

export class League extends Entry {
  public get id(): ID {
    return this.data?.id;
  }

  public get name(): string {
    return this.data?.name;
  }

  public get subleagues(): ID[] {
    return this.data?.subleagues || [];
  }

  public get tiebreakers(): ID {
    return this.data?.tiebreakers;
  }
}
