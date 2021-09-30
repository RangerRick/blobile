import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LiveFeedPageComponent } from './live-feed.page';

const routes: Routes = [
  {
    path: '',
    component: LiveFeedPageComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LiveFeedPageRoutingModule {}
