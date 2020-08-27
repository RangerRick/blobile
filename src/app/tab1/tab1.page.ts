import { Component } from '@angular/core';

import { LoadingController } from '@ionic/angular';

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

  protected loading: HTMLIonLoadingElement;
  constructor(public loadingController: LoadingController) {
    this.showLoading();
    this.startListening();
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

  doSearch() {
    if (!this.searchTerm || this.searchTerm.length < 2) {
      this.games = this.data.schedule;
      return;
    }

    this.games = this.data.schedule.filter(game => {
      return game.homeTeamName.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1
        || game.awayTeamName.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1
    });

    return this.games;
  }


  startListening() {
    console.log('opening event stream to blaseball.com');

    const bases = [ 'first', 'second', 'third' ];
    // const evtSource = new EventSource('https://cors-proxy.blaseball-reference.com/http://www.blaseball.com/events/streamGameData');
    const evtSource = new EventSource('https://cors-anywhere.herokuapp.com/http://www.blaseball.com/events/streamGameData');
    let latestGameDataState = {} as any;
    evtSource.addEventListener('message', (evt: MessageEvent) => {
      const data = JSON.parse(evt.data).value;
      const { lastUpdateTime, ...dataExcludingLastUpdateTime } = data;

      //console.debug('got data:', data);
      this.data = data;
      this.doSearch();
      this.hideLoading();
    });

    evtSource.addEventListener('error', (evt: ErrorEvent) => {
      this.hideLoading();
      console.error(evt);
    });
  }
}
