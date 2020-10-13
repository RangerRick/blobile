import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { ScoreBoxComponent } from './score-box.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
  ],
  declarations: [ScoreBoxComponent],
  exports: [ScoreBoxComponent]
})
export class ScoreBoxComponentModule {}
