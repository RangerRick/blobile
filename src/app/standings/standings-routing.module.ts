import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StandingsPageComponent } from './standings.page';

const routes: Routes = [
  {
    path: '',
    component: StandingsPageComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StandingsPageRoutingModule {}
