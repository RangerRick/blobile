import { Component, OnInit, Input } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';

import { Team } from '../../lib/model/team';
import { APIDatabase } from '../../lib/api/database';
import { SettingsService } from '../../lib/settings.service';
import { Player } from '../../lib/model/player';

@Component({
  selector: 'bl-team-page',
  templateUrl: './team-page.page.html',
  styleUrls: ['./team-page.page.scss'],
})
export class TeamPage implements OnInit {
  @Input() public id: string;

  public team = {} as Team;
  public lineup = [] as Player[];
  public rotation = [] as Player[];

  private lastToast: HTMLIonToastElement;

  constructor(
    public database: APIDatabase,
    public modalController: ModalController,
    public settings: SettingsService,
    public toastController: ToastController,
  ) {
  }

  async ngOnInit() {
    this.team = (await this.database.teams()).find((team:Team) => {
      return team.id === this.id;
    });
    console.debug('team=', this.team);

    const lineupP = this.database.players(this.team.lineup).then((players: Player[]) => {
      this.lineup = players;
      console.debug('lineup=', this.lineup);
    });

    const rotationP = this.database.players(this.team.rotation).then((players: Player[]) => {
      this.rotation = players;
      console.debug('rotation=', this.rotation);
    });

    return Promise.all([this.team, lineupP, rotationP]);
  }

  public close() {
    this.modalController.dismiss();
  }

  public isFavorite() {
    return this.settings.isFavorite(this.id);
  }

  public async toggleFavorite() {
    const isFavorite = await this.settings.toggleFavorite(this.id);
    if (this.lastToast) {
      this.lastToast.dismiss();
    }
    this.lastToast = await this.toastController.create({
      color: 'primary',
      duration: 1000,
      message: isFavorite? `The ${this.team.nickname} have been favorited.` : `The ${this.team.nickname} are no longer a favorite team.`,
      position: 'top',
    });
    return this.lastToast.present();
  }
}
