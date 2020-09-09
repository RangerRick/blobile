import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TeamPage } from './team-page.page';

const routes: Routes = [
  {
    path: '',
    component: TeamPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeamPageRoutingModule {}
