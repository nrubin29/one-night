import { Component, OnInit } from '@angular/core';
import CardHolder from '../../../../../common/card-holder';
import { RoleComponent } from '../../role/role.component';

@Component({
  selector: 'app-minion',
  templateUrl: './minion.component.html',
  styleUrls: ['./minion.component.scss']
})
export class MinionComponent implements OnInit {
  players: CardHolder[];

  constructor(private roleComponent: RoleComponent) {
  }

  ngOnInit() {
    this.players = this.roleComponent.packet.players.map(p => p as CardHolder).filter(p => p.card.name === 'Werewolf');
  }
}
