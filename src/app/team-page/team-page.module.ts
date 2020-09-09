import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TeamPageRoutingModule } from './team-page-routing.module';

import { TeamPage } from './team-page.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TeamPageRoutingModule
  ],
  declarations: [TeamPage]
})
export class TeamPageModule {}
