import { Entry } from './_entry';

export class Team extends Entry {
  public id: string;

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