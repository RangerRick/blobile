import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

import { SettingsService } from '../settings.service';

// import Positions from '../../lib/model/positions';
// import Player from '../../lib/model/player';

@Component({
  selector: 'app-diamond',
  templateUrl: './diamond.component.html',
  styleUrls: ['./diamond.component.scss'],
})
export class DiamondComponent implements OnInit {
  @Input() public game: any;
  @Output("refresh") public refresh: EventEmitter<any> = new EventEmitter();

  public playerFontSize = '1.1rem';

  public coordinates = {
    first:  [ 430, 355 ],
    second: [ 328, 190 ],
    third:  [ 225, 355 ],
  };

  constructor(private settings: SettingsService) {
    console.debug('Diamond component created.');
  }

  async ngOnInit() {
    console.debug('Diamond component initialized.');
    console.debug(this.game);
    return this.settings.ready;
  }

  isFavorite(teamId: string) {
    return this.settings.isFavorite(teamId);
  }

  toggleFavorite(teamId: string) {
    this.settings.toggleFavorite(teamId);
    if (this.refresh) {
      console.debug('toggleFavorite(): refreshing');
      this.refresh.emit();
    }
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

  getEmoji(type: string) {
    switch(type) {
      case 'home':
        return String.fromCodePoint(this.game.homeTeamEmoji);
      case 'away':
        return String.fromCodePoint(this.game.awayTeamEmoji);
      default:
        return '';
    }
  }
}
