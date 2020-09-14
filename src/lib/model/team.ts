import { Entry } from './_entry';

export class Team extends Entry {
  public id: string;
  public championships: number;
  public emoji: string;
  public fullName: string;
  public location: string;
  public mainColor: string;
  public nickname: string;
  public seasonShames: number;
  public seasonShamings: number;
  public secondaryColor: string;
  public shameRuns: number;
  public shorthand: string;
  public slogan: string;
  public totalShames: number;
  public totalShamings: number;

  constructor(data?: any) {
    super(data);

    this.defineStrings([
      'id',
      'emoji',
      'fullName',
      'location',
      'mainColor',
      'nickname',
      'secondaryColor',
      'shorthand',
      'slogan',
    ]);

    this.defineNumbers([
      'championships',
      'seasonShames',
      'seasonShamings',
      'shameRuns',
      'totalShames',
      'totalShamings',
    ]);
  }

  public get bench(): string[] {
    return this.data.bench || [];
  }

  public get bullpen(): string[] {
    return this.data.bullpen || [];
  }

  public get lineup(): string[] {
    return this.data.lineup || [];
  }

  public get rotation(): string[] {
    return this.data.rotation || [];
  }
}
