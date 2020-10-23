import { Entry, ID } from './_entry';

export class Season extends Entry {
  public id: ID;
  public league: ID;
  public rules: ID;
  public schedule: ID;
  public seasonNumber: number;
  public standings: ID;
  public stats: ID;
  public terminology: ID;

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
