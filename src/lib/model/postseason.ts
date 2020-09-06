import { Entry } from './_entry';
import { Playoffs } from './playoffs';
import { Round } from './round';

export class Postseason extends Entry {

  public get playoffs() {
    return new Playoffs(this.data?.playoffs);
  }

  public get round() {
    return new Round(this.data?.round);
  }
}