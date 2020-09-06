import { Entry } from './_entry';

export class Subleague extends Entry {
  public get id(): string {
    return this.data.id;
  }

  public get name(): string {
    return this.data.name;
  }

  public get divisions(): string[] {
    return this.data.divisions || [];
  }
}