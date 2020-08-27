import { Component } from '@angular/core';

import Positions from '../../model/positions';
import Player from '../../model/player';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  protected positions = {
    first: null,
    second: null,
    third: null,
    home: null,
    pitcher: null,
  } as Positions;

  protected homeTeam = "";
  protected awayTeam = "";

  protected data = {} as any;

  constructor() {
    /*
    setTimeout(() => {
      this.positions = {
        first: new Player("John Johnsonjon"),
        second: null,
        third: null,
        home: null,
        pitcher: null
      };
    }, 1000);
    */
    this.startListening();
  }

  startListening() {
    console.log('opening event stream to blaseball.com');

    const bases = [ 'first', 'second', 'third' ];
    const evtSource = new EventSource('https://cors-anywhere.herokuapp.com/http://www.blaseball.com/events/streamGameData');
    let latestGameDataState = {} as any;
    evtSource.addEventListener('message', (evt: MessageEvent) => {
      const data = JSON.parse(evt.data).value;
      const { lastUpdateTime, ...dataExcludingLastUpdateTime } = data;

      //console.debug('got data:', data);
      this.data = data;

      // check if updated state data exists
      if (JSON.stringify(dataExcludingLastUpdateTime) !== JSON.stringify(latestGameDataState)) {
        latestGameDataState = dataExcludingLastUpdateTime;
      }

      for (const game of latestGameDataState.schedule) {
        this.homeTeam = game.homeTeamName;
        this.awayTeam = game.awayTeamName;

        this.positions.first = null;
        this.positions.second = null;
        this.positions.third = null;
        if (game.baserunnerCount > 0) {
          for (let i=0; i < game.baserunnerCount; i++) {
            const name = game.baseRunnerNames[i];
            const base = game.basesOccupied[i];
            console.log(`${this.homeTeam}: ${name} is on base ${base}`);
            this.positions[bases[base]] = new Player(name);
          }
        }
        if (this.homeTeam === 'Hawaii Fridays') {
          break;
        }
      }

    });

    evtSource.addEventListener('error', (evt: ErrorEvent) => {
      console.error(evt);
    });
  }
}
