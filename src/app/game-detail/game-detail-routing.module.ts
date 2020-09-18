import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GameDetailPage } from './game-detail.page';

const routes: Routes = [
  {
    path: '',
    component: GameDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GameDetailPageRoutingModule {}
