import { Entry } from './_entry';

export class Tiebreaker extends Entry {
  public get id(): string {
    return this.data?.id;
  }

  public get order(): string[] {
    return this.data?.order || [];
  }
}
