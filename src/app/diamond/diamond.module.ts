import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { DiamondComponent } from './diamond.component';
import { TeamComponentModule } from '../team/team.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    TeamComponentModule,
  ],
  declarations: [DiamondComponent],
  exports: [DiamondComponent]
})
export class DiamondComponentModule {}
