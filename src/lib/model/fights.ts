import { Entry } from './_entry';

import { BossFight } from './bossfight';

export class Fights extends Entry {

  constructor(data?: any) {
    super(data);
  }

  public get bossFights(): BossFight[] {
    if (this.data?.bossFights && Array.isArray(this.data.bossFights)) {
      return this.data.bossFights.map((fight: any) => new BossFight(fight));
    }
    return [];
  }
}
