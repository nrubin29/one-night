import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './views/home/home.component';
import { FormsModule } from '@angular/forms';
import { LobbyComponent } from './views/lobby/lobby.component';
import { SocketService } from './services/socket.service';
import { CardViewComponent } from './views/card-view/card-view.component';
import { SocketGuard } from './guards/socket.guard';
import { NightComponent } from './views/night/night.component';
import { ViewCardsComponent } from './components/view-cards/view-cards.component';
import { ViewPlayersComponent } from './components/view-players/view-players.component';
import { DayComponent } from './views/day/day.component';
import { WerewolfComponent } from './views/roles/werewolf/werewolf.component';
import { PluralizePipe } from './pipes/pluralize.pipe';
import { CardComponent } from './components/card/card.component';
import { PlayerComponent } from './components/player/player.component';
import { VoteComponent } from './views/vote/vote.component';
import { EndComponent } from './views/end/end.component';
import { MinionComponent } from './views/roles/minion/minion.component';
import { ApprenticeSeerComponent } from './views/roles/apprentice-seer/apprentice-seer.component';
import { MasonComponent } from './views/roles/mason/mason.component';
import { SetupComponent } from './views/setup/setup.component';
import { HttpModule } from '@angular/http';
import { HeaderComponent } from './components/header/header.component';
import { CountdownComponent } from './components/countdown/countdown.component';
import { JoinComponent } from './views/join/join.component';
import { RoleComponent } from './views/role/role.component';
import { RobberComponent } from './views/roles/robber/robber.component';
import { SelectPlayersComponent } from './components/select-players/select-players.component';
import { TroublemakerComponent } from './views/roles/troublemaker/troublemaker.component';
import { InsomniacComponent } from './views/roles/insomniac/insomniac.component';

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
    CardComponent,
    PlayerComponent,
    VoteComponent,
    EndComponent,
    MinionComponent,
    ApprenticeSeerComponent,
    MasonComponent,
    SetupComponent,
    HeaderComponent,
    CountdownComponent,
    JoinComponent,
    RoleComponent,
    RobberComponent,
    SelectPlayersComponent,
    TroublemakerComponent,
    InsomniacComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    SocketService,
    SocketGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
