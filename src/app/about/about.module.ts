import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AboutPageComponent } from './about.page';

import { AboutPageRoutingModule } from './about-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: AboutPageComponent }]),
    AboutPageRoutingModule,
  ],
  declarations: [AboutPageComponent]
})
export class AboutPageModule {}
