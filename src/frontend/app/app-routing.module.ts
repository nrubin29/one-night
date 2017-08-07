import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./views/home/home.component";
import {LobbyComponent} from "./views/lobby/lobby.component";
import {CardComponent} from "./views/card/card.component";
import {SocketGuard} from "./guards/socket.guard";
import {NightComponent} from "./views/night/night.component";
import {ViewCardsComponent} from "./views/view-cards/view-cards.component";
import {ViewPlayersComponent} from "./views/view-players/view-players.component";
import {DayComponent} from "./views/day/day.component";

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {path: 'lobby', component: LobbyComponent, canActivate: [SocketGuard]},
  {path: 'card', component: CardComponent, canActivate: [SocketGuard]},
  {path: 'night', component: NightComponent, canActivate: [SocketGuard]},
  {path: 'view-cards', component: ViewCardsComponent, canActivate: [SocketGuard]},
  {path: 'view-players', component: ViewPlayersComponent, canActivate: [SocketGuard]},
  {path: 'day', component: DayComponent, canActivate: [SocketGuard]},
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, {useHash: true}) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
