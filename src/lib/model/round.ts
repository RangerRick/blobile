import { Entry } from './_entry';

export class Round extends Entry {
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