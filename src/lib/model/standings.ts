import { Entry } from './_entry';

export interface Record {
  id: string;
  wins: number;
  losses: number;
}

export class Standings extends Entry {
  public id: string;

  constructor(data?: any) {
    super(data);

    this.defineStrings([
      'id',
    ]);
  }

  public get wins(): { [key: string]: number }[] {
    return this.data?.wins || [];
  }

  public get losses(): { [key: string]: number }[] {
    return this.data?.losses || [];
  }

  public get records() {
    const ret = [] as Record[];
    for (const id of Object.keys(this.data.losses || {})) {
      ret.push({
        id,
        wins: this.data.wins[id],
        losses: this.data.losses[id],
      });
    }
    return ret;
  }
}
