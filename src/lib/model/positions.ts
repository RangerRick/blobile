import { Player } from './player';

export default interface Positions {
  first: Player | null,
  second: Player | null,
  third: Player | null,
  home: Player | null,
  pitcher: Player | null,
}
