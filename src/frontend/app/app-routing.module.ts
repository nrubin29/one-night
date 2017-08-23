import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './views/home/home.component';
import {LobbyComponent} from './views/lobby/lobby.component';
import {CardViewComponent} from './views/card-view/card-view.component';
import {SocketGuard} from './guards/socket.guard';
import {NightComponent} from './views/night/night.component';
import {DayComponent} from './views/day/day.component';
import {WerewolfComponent} from './views/roles/werewolf/werewolf.component';
import {VoteComponent} from './views/vote/vote.component';
import {EndComponent} from './views/end/end.component';
import {MinionComponent} from './views/roles/minion/minion.component';
import {ApprenticeSeerComponent} from './views/roles/apprentice-seer/apprentice-seer.component';
import {MasonComponent} from './views/roles/mason/mason.component';
import {SetupComponent} from './views/setup/setup.component';
import {JoinComponent} from './views/join/join.component';
import {RoleComponent} from './views/role/role.component';
import {RobberComponent} from './views/roles/robber/robber.component';
import {TroublemakerComponent} from "app/views/roles/troublemaker/troublemaker.component";
import {InsomniacComponent} from './views/roles/insomniac/insomniac.component';
import {SeerComponent} from './views/roles/seer/seer.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'setup', component: SetupComponent},
  {path: 'join', component: JoinComponent, canActivate: [SocketGuard]},
  {path: 'lobby', component: LobbyComponent, canActivate: [SocketGuard]},
  {path: 'card', component: CardViewComponent, canActivate: [SocketGuard]},
  {path: 'night', component: NightComponent, canActivate: [SocketGuard]},
  {
    path: 'role', component: RoleComponent, canActivate: [SocketGuard], children:
    [
      {path: 'werewolf', component: WerewolfComponent},
      {path: 'minion', component: MinionComponent},
      {path: 'mason', component: MasonComponent},
      {path: 'seer', component: SeerComponent},
      {path: 'apprentice-seer', component: ApprenticeSeerComponent},
      {path: 'robber', component: RobberComponent},
      {path: 'troublemaker', component: TroublemakerComponent},
      {path: 'insomniac', component: InsomniacComponent},
    ]
  },
  {path: 'day', component: DayComponent, canActivate: [SocketGuard]},
  {path: 'vote', component: VoteComponent, canActivate: [SocketGuard]},
  {path: 'end', component: EndComponent, canActivate: [SocketGuard]},
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, {useHash: true}) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
