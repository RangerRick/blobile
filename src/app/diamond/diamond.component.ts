import { Component, Input, OnInit } from '@angular/core';

import Positions from '../../model/positions';
import Player from '../../model/player';

@Component({
  selector: 'app-diamond',
  templateUrl: './diamond.component.html',
  styleUrls: ['./diamond.component.scss'],
})
export class DiamondComponent implements OnInit {
  @Input() public positions = {
    first: null,
    second: null,
    third: null,
    home: null,
    pitcher: null,
  } as Positions;
  @Input() public homeTeam: string;
  @Input() public awayTeam: string;
  @Input() public game: any;

  protected playerFontSize = '1.1rem';

  protected coordinates = {
    first:  [ 430, 355 ],
    second: [ 328, 190 ],
    third:  [ 225, 355 ],
  };

  constructor() {
    console.debug('Diamond component created.');
  }

  ngOnInit() {
    console.debug('Diamond component initialized.');
    console.debug(this.game);
  }

  inProgress() {
    return this.game && !this.game.gameComplete;
  }

  getName(person: any) {
    if (person && person.name) {
      return person.name;
    }
    return null;
  }

  getBaseRunner(base: number) {
    if (this.inProgress()) {
      for (let i=0; i < this.game.basesOccupied.length; i++) {
        const b = this.game.basesOccupied[i];
        if (b === base) {
          return { name: this.game.baseRunnerNames[i], id: this.game.baseRunners[i] };
        }
      }
    }
    return null;
  }

  getPitcher() {
    if (this.inProgress()) {
      if (this.game.topOfInning) {
        return { id: this.game.homePitcher, name: this.game.homePitcherName };
      } else {
        return { id: this.game.awayPitcher, name: this.game.awayPitcherName };
      }
    }
    return null;
  }

  getBatter() {
    if (this.inProgress()) {
      if (this.game.topOfInning) {
        return { id: this.game.awayBatter, name: this.game.awayBatterName };
      } else {
        return { id: this.game.homeBatter, name: this.game.homeBatterName };
      }
    }
  }
}
