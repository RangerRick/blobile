import { Entry } from './_entry';

export class Division extends Entry {
  public get id(): string {
    return this.data.id;
  }

  public get name(): string {
    return this.data.name;
  }

  public get teams(): string[] {
    return this.data.teams || [];
  }
}