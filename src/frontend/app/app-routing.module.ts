import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './views/home/home.component';
import {LobbyComponent} from './views/lobby/lobby.component';
import {CardViewComponent} from './views/card-view/card-view.component';
import {SocketGuard} from './guards/socket.guard';
import {NightComponent} from './views/night/night.component';
import {DayComponent} from './views/day/day.component';
import {WerewolfComponent} from './views/roles/werewolf/werewolf.component';
import {VoteComponent} from "./views/vote/vote.component";
import {EndComponent} from "./views/end/end.component";

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {path: 'lobby', component: LobbyComponent, canActivate: [SocketGuard]},
  {path: 'card', component: CardViewComponent, canActivate: [SocketGuard]},
  {path: 'night', component: NightComponent, canActivate: [SocketGuard]},
  {path: 'werewolf', component: WerewolfComponent, canActivate: [SocketGuard]}, // TODO: Sub-router for roles.
  {path: 'day', component: DayComponent, canActivate: [SocketGuard]},
  {path: 'vote', component: VoteComponent, canActivate: [SocketGuard]},
  {path: 'end', component: EndComponent, canActivate: [SocketGuard]},
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, {useHash: true}) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
