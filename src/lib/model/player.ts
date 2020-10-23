import { Entry, ID } from './_entry';

export class Player extends Entry {
  public id: ID;
  public name: string;
  public deceased: boolean;
  public fate: number;
  public ritual: string;

  constructor(data?: any) {
    super(data);

    this.defineStrings([
      'id',
      'name',
      'ritual',
    ]);
    this.defineNumbers([
      'fate',
    ]);
    this.defineBooleans([
      'deceased',
    ]);
  }
}
