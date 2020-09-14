import { Entry } from './_entry';

export class Season extends Entry {
  public id: string;
  public league: string;
  public rules: string;
  public schedule: string;
  public seasonNumber: number;
  public standings: string;
  public stats: string;
  public terminology: string;

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
