import { Entry } from './_entry';

export class Round extends Entry {
  public id: string;
  public gameIndex: number;
  public name: string;
  public roundNumber: number;
  public special: boolean;

  constructor(data?: any) {
    super(data);

    this.defineStrings([
      'id',
      'name',
    ]);

    this.defineBooleans([
      'special',
    ]);

    this.defineNumbers([
      'gameIndex',
    ]);

    this.defineIncrementedNumbers([
      'roundNumber',
    ]);
  }

}