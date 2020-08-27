import { Component } from '@angular/core';

import { LoadingController } from '@ionic/angular';

import { SettingsService, SEGMENT } from '../settings.service';

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
  protected games = [] as any[];
  protected searchTerm: string;
  protected segment = 'all' as SEGMENT;

  protected loading: HTMLIonLoadingElement;
  constructor(public loadingController: LoadingController, protected settings: SettingsService) {
    // this.showLoading();
    settings.ready.finally(() => {
      this.segment = this.settings.getSegment();
      this.startListening();
    });
  }

  async showLoading() {
    this.hideLoading();
    this.loading = await this.loadingController.create({
      showBackdrop: false,
      translucent: true,
    });
    this.loading.present();
  }

  async hideLoading() {
    if (this.loading) {
      this.loading.dismiss();
    }
  }

  filterList(evt: any) {
    this.searchTerm = evt.srcElement.value;
    return this.doSearch();
  }

  getSegmentGames() {
    if (this.data && this.data.schedule) {
      return this.data.schedule.filter((game: any) => {
        switch(this.segment) {
          case 'all':
            return true;
          case 'active':
            return !game.gameComplete;
          case 'favorites':
            return this.settings.isFavorite(game.homeTeam) || this.settings.isFavorite(game.awayTeam);
          default:
            console.warn(`unhandled segment: ${this.segment}`);
            return false;
        }
      }).sort((a: any, b: any) => {
        const nameA = a.homeTeamNickname;
        const nameB = b.homeTeamNickname;
        return (nameA < nameB) ? -1 : (nameA > nameB) ? 1 : 0;
      });
    }
    return [];
  }

  doSearch() {
    let ret = this.getSegmentGames();

    if (this.searchTerm && this.searchTerm.length >= 2) {
      // search term is long enough, filter based on team names
      ret = ret.filter((game: any) => {
        return game.homeTeamName.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1
          || game.awayTeamName.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1
      });
    }

    this.games = ret;
    return this.games;
  }

  segmentChanged(evt: any) {
    if (evt && evt.detail && evt.detail.value) {
      this.segment = evt.detail.value;
      this.settings.setSegment(this.segment);
    }
    console.debug('segment changed:', evt);
    this.doSearch();
  }

  startListening() {
    console.log('opening event stream to blaseball.com');

    const bases = [ 'first', 'second', 'third' ];
    const evtSource = new EventSource('https://cors-proxy.blaseball-reference.com/events/streamGameData');
    // const evtSource = new EventSource('https://cors-anywhere.herokuapp.com/http://www.blaseball.com/events/streamGameData');
    let latestGameDataState = {} as any;
    evtSource.addEventListener('message', async (evt: MessageEvent) => {
      const data = JSON.parse(evt.data).value;
      const { lastUpdateTime, ...dataExcludingLastUpdateTime } = data;

      this.hideLoading();

      //console.debug('got data:', data);
      this.data = data;
      this.doSearch();
    });

    evtSource.addEventListener('error', (evt: ErrorEvent) => {
      this.hideLoading();
      console.error(evt);
    });
  }
}
