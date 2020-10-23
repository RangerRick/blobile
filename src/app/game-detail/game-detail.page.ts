import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { APIStream } from 'src/lib/api/stream';
import { BossFight } from 'src/lib/model/bossfight';
import { Game } from 'src/lib/model/game';
import { StreamData } from 'src/lib/model/streamData';
import { SettingsService } from 'src/lib/settings.service';
import { VoiceService } from 'src/lib/voice.service';

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.page.html',
  styleUrls: ['./game-detail.page.scss'],
})
export class GameDetailPage implements OnInit {
  @Input() public id: string;
  streamData: StreamData;
  game: Game | BossFight;
  lastPlayCount = -1;
  updateLog = [] as { time: string, entry: string }[];
  muted = false;

  private subscription: Subscription;

  constructor(
    private modalController: ModalController,
    public settings: SettingsService,
    public stream: APIStream,
    public voiceService: VoiceService,
  ) { }

  ngOnInit() {
    /*
    this.updateLog = [
      { time: '04:17', entry: 'really really really really long entry that has some excessive amounts of text' },
      { time: '04:16', entry: 'blah blah blah' },
      { time: '04:15', entry: 'blah blah blah' },
      { time: '04:14', entry: 'blah blah blah' },
    ];
    */

    setTimeout(() => {
      this.init();
    }, 200);
  }

  async init() {
    await this.settings.ready;

    this.subscription = await this.stream.subscribe((streamData: StreamData) => {
      const game = streamData?.games?.schedule?.find((g: Game) => g.id === this.id);
      if (game && game.playCount > this.lastPlayCount) {
        this.streamData = streamData;
        this.game = game;
        this.lastPlayCount = game.playCount;

        const now = new Date();
        this.updateLog.unshift({
          time: ('0' + now.getMinutes()).slice(-2) + ':' + ('0' + now.getSeconds()).slice(-2),
          entry: game.lastUpdate,
        });
        if (!this.muted) {
          this.voiceService.say(game.lastUpdate);
        }
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
