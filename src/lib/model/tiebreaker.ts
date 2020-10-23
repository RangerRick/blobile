import { Entry, ID } from './_entry';

export class Tiebreaker extends Entry {
  public get id(): ID {
    return this.data?.id;
  }

  public get order(): ID[] {
    return this.data?.order || [];
  }
}
