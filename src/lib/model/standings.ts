import { Entry, ID } from './_entry';

export interface Record {
  id: ID;
  wins: number;
  losses: number;
  nonLosses: number;
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

  public get gamesPlayed(): { [key: string]: number }[] {
    return this.data?.gamesPlayed || [];
  }

  public get records(): { [key: string]: Record } {
    const ret = {};
    for (const id of Object.keys(this.data.losses || {})) {
      ret[id] = {
        id,
        wins: this.data.wins[id],
        losses: this.data.losses[id],
        nonLosses: this.data.gamesPlayed[id] - this.data.losses[id],
      };
    }
    return ret;
  }
}
