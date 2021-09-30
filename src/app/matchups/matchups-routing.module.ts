import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatchupsPageComponent as MatchupsPageComponent } from './matchups.page';

const routes: Routes = [
  {
    path: '',
    component: MatchupsPageComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MatchupsPageRoutingModule {}
