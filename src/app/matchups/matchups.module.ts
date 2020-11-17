import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatchupsPage as MatchupsPage } from './matchups.page';

import { MatchupsPageRoutingModule } from './matchups-routing.module';
import { TeamComponentModule } from '../team/team.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TeamComponentModule,
    MatchupsPageRoutingModule
  ],
  declarations: [MatchupsPage]
})
export class MatchupsPageModule {}
