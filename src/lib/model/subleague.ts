import { Entry, ID } from './_entry';

export class Subleague extends Entry {
  public get id(): ID {
    return this.data.id;
  }

  public get name(): string {
    return this.data.name;
  }

  public get divisions(): ID[] {
    return this.data.divisions || [];
  }
}
