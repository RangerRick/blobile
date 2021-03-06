import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StandingsPage } from './standings.page';

import { StandingsPageRoutingModule } from './standings-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    StandingsPageRoutingModule
  ],
  declarations: [StandingsPage]
})
export class StandingsPageModule {}
