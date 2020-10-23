import { Entry, ID } from './_entry';

export class Division extends Entry {
  public get id(): ID {
    return this.data.id;
  }

  public get name(): string {
    return this.data.name;
  }

  public get teams(): ID[] {
    return this.data.teams || [];
  }
}
