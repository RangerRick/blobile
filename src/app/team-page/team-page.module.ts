import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TeamPageRoutingModule } from './team-page-routing.module';

import { TeamPageComponent } from './team-page.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TeamPageRoutingModule
  ],
  declarations: [TeamPageComponent]
})
export class TeamPageModule {}
