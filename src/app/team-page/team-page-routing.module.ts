import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TeamPageComponent } from './team-page.page';

const routes: Routes = [
  {
    path: '',
    component: TeamPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeamPageRoutingModule {}
