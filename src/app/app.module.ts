import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { Deploy } from 'cordova-plugin-ionic/dist/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { APIStream } from '../lib/api/stream';

// import { environment } from '../environments/environment';

import { DiamondComponentModule } from './diamond/diamond.module';
import { GameDetailPageModule } from './game-detail/game-detail.module';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    AppRoutingModule,
    BrowserModule,
    IonicModule.forRoot(),
    DiamondComponentModule,
    GameDetailPageModule,
  ],
  providers: [
    Deploy,
    APIStream,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
  }
}
