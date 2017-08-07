import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {HomeComponent} from './views/home/home.component';
import {FormsModule} from '@angular/forms';
import {LobbyComponent} from './views/lobby/lobby.component';
import {SocketService} from './services/socket.service';
import {CardViewComponent} from './views/card-view/card-view.component';
import {SocketGuard} from './guards/socket.guard';
import {NightComponent} from './views/night/night.component';
import {ViewCardsComponent} from './components/view-cards/view-cards.component';
import {ViewPlayersComponent} from './components/view-players/view-players.component';
import {DayComponent} from './views/day/day.component';
import {WerewolfComponent} from './views/roles/werewolf/werewolf.component';
import {PluralizePipe} from './pipes/pluralize.pipe';
import {CardComponent} from './components/card/card.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LobbyComponent,
    CardViewComponent,
    NightComponent,
    ViewCardsComponent,
    ViewPlayersComponent,
    DayComponent,
    WerewolfComponent,
    PluralizePipe,
    CardComponent
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
