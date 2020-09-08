import { Entry } from './_entry';

export interface Record {
  id: string,
  wins: number,
  losses: number,
}

export class Standings extends Entry {
  public id: string;

  constructor(data?: any) {
    super(data);

    this.defineStrings([
      'id',
    ]);
  }

  public get records() {
    const ret = [] as Record[];
    for (const id of Object.keys(this.data.losses || {})) {
      ret.push({
        id: id,
        wins: this.data.wins[id],
        losses: this.data.losses[id],
      });
    }
    return ret;
  }
}