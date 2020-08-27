import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { DiamondComponent } from './diamond.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
  ],
  declarations: [DiamondComponent],
  exports: [DiamondComponent]
})
export class DiamondComponentModule {}
