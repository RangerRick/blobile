import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatchupsPage as MatchupsPage } from './matchups.page';

const routes: Routes = [
  {
    path: '',
    component: MatchupsPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MatchupsPageRoutingModule {}
