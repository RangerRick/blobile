import { Entry } from './_entry';

export class Season extends Entry {
  constructor(data?: any) {
    super(data);

    this.defineStrings([
      'id',
      'league',
      'rules',
      'schedule',
      'standings',
      'stats',
      'terminology'
    ]);
    this.defineIncrementedNumbers([
      'seasonNumber'
    ]);
  }

}