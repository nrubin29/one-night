import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import {HomeComponent} from './views/home/home.component';
import {FormsModule} from "@angular/forms";
import {LobbyComponent} from './views/lobby/lobby.component';
import {SocketService} from "./services/socket.service";
import {CardComponent} from './views/card/card.component';
import {SocketGuard} from "./guards/socket.guard";
import {NightComponent} from './views/night/night.component';
import {ViewCardsComponent} from './views/view-cards/view-cards.component';
import {ViewPlayersComponent} from './views/view-players/view-players.component';
import {DayComponent} from './views/day/day.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LobbyComponent,
    CardComponent,
    NightComponent,
    ViewCardsComponent,
    ViewPlayersComponent,
    DayComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [
    SocketService,
    SocketGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
