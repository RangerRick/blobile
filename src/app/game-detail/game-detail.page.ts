import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { APIStream } from 'src/lib/api/stream';
import { Game } from 'src/lib/model/game';
import { StreamData } from 'src/lib/model/streamData';

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.page.html',
  styleUrls: ['./game-detail.page.scss'],
})
export class GameDetailPage implements OnInit {
  @Input() public id: string;
  streamData: StreamData;
  game: Game;
  updateLog = [] as { time: string, entry: string }[];

  private subscription: Subscription;

  constructor(
    private modalController: ModalController,
    public stream: APIStream,
  ) { }

  async ngOnInit() {
    /*
    this.updateLog = [
      { time: '04:17', entry: 'really really really really long entry that has some excessive amounts of text' },
      { time: '04:16', entry: 'blah blah blah' },
      { time: '04:15', entry: 'blah blah blah' },
      { time: '04:14', entry: 'blah blah blah' },
    ]
    */
    setTimeout(() => {
      this.init();
    }, 200);
  }

  async init() {
    this.subscription = await this.stream.subscribe((streamData: StreamData) => {
      this.streamData = streamData;
      const game = streamData?.games?.schedule?.find((game: Game) => game.id === this.id);
      if (game && game.lastUpdate !== this.updateLog[0]?.entry) {
        this.game = game;
        const now = new Date();
        this.updateLog.unshift({
          time: ('0' + now.getHours()).slice(-2) + ':' + ('0' + now.getMinutes()).slice(-2) + ':' + ('0' + now.getSeconds()).slice(-2),
          entry: game.lastUpdate,
        });
      }
    });
  }

  public close() {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = undefined;
    }
    this.modalController.dismiss();
  }
}
