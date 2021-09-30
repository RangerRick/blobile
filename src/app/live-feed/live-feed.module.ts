import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { LiveFeedPageComponent } from './live-feed.page';
import { DiamondComponentModule } from '../diamond/diamond.module';
import { LiveFeedPageRoutingModule } from './live-feed-routing.module';
import { TeamComponentModule } from '../team/team.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    LiveFeedPageRoutingModule,
    DiamondComponentModule,
    TeamComponentModule,
  ],
  declarations: [LiveFeedPageComponent]
})
export class LiveFeedPageModule {}
