import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { LiveFeedPage } from './live-feed.page';
import { DiamondComponentModule } from '../diamond/diamond.module';
import { LiveFeedPageRoutingModule } from './live-feed-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    LiveFeedPageRoutingModule,
    DiamondComponentModule,
  ],
  declarations: [LiveFeedPage]
})
export class LiveFeedPageModule {}
