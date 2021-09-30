import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GameDetailPageComponent } from './game-detail.page';

const routes: Routes = [
  {
    path: '',
    component: GameDetailPageComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GameDetailPageRoutingModule {}
