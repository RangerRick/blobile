import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { APIStream } from 'src/lib/api/stream';
import { StreamData } from 'src/lib/model/streamData';

import { UpdateService } from '../../lib/update.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {
  public streamData = new StreamData({});
  public subscription: Subscription;

  constructor(
    public stream: APIStream,
    public updateService: UpdateService,
  ) {}

  async ngOnInit() {
    this.subscription?.unsubscribe();
    this.subscription = await this.stream.subscribe((evt) => {
      if (evt instanceof StreamData) {
        this.streamData = evt;
      }
    });
  }

  showStandings() {
    if (this.streamData?.sim?.showStandings !== undefined) {
      return this.streamData.sim.showStandings;
    }
    return true;
  }

}
