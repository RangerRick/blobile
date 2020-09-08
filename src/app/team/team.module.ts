import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { TeamComponent } from './team.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
  ],
  declarations: [TeamComponent],
  exports: [TeamComponent]
})
export class TeamComponentModule {}
