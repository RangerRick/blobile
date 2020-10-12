import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { DiamondComponent } from './diamond.component';
import { TeamComponentModule } from '../team/team.module';
import { TeamPageModule } from '../team-page/team-page.module';
import { ScoreBoxComponentModule } from '../score-box/score-box.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    TeamComponentModule,
    TeamPageModule,
    ScoreBoxComponentModule,
  ],
  declarations: [DiamondComponent],
  exports: [DiamondComponent]
})
export class DiamondComponentModule {}
