import { Component } from '@angular/core';
import { LoadingController } from '@ionic/angular';

import { APIService } from '../api.service';
import { SettingsService, SEGMENT } from '../settings.service';

import Positions from '../../model/positions';

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

  // protected loading: HTMLIonLoadingElement;
  protected loading: boolean;
  protected errors = 0;
  protected lastUpdate = "look, it's been a while, OK?";

  private api = new APIService();

  constructor(public loadingController: LoadingController, protected settings: SettingsService) {
    this.showLoading();
    settings.ready.finally(() => {
      this.segment = this.settings.getSegment();
      this.startListening();
    });
  }

  async showLoading() {
    this.loading = true;
    /*
    this.hideLoading();
    this.loading = await this.loadingController.create({
      showBackdrop: false,
      translucent: true,
    });
    this.loading.present();
    */
  }

  async hideLoading() {
    this.loading = false;
    /*
    if (this.loading) {
      this.loading.dismiss();
    }
    */
  }

  filterList(evt: any) {
    this.searchTerm = evt.srcElement.value;
    return this.doSearch();
  }

  getSegmentGames() {
    if (this.data && this.data.games && this.data.games.schedule) {
      return this.data.games.schedule.filter((game: any) => {
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
    this.showLoading();

    const observable = this.api.start();
    observable.subscribe(evt => {
      this.lastUpdate = new Date().toISOString();
      this.errors = 0;
      const data = JSON.parse(evt.data).value;

      for (const key of Object.keys(data)) {
        this.data[key] = data[key];
      }

      console.debug('current data:', this.data);
      this.doSearch();
      this.hideLoading();
    }, (err) => {
      this.hideLoading();
      this.loading = false;
      this.errors++;
    });
  }

  gameId(index: number, item:any): string {
    if (item && item.id) {
      return item.id;
    }
    return String(index);
  }
}
