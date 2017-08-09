import { Component, OnInit } from '@angular/core';
import CardHolder from "../../../../../common/card-holder";
import { RoleComponent } from '../../role/role.component';

@Component({
  selector: 'app-werewolf',
  templateUrl: './werewolf.component.html',
  styleUrls: ['./werewolf.component.scss']
})
export class WerewolfComponent implements OnInit {
  players: CardHolder[];
  centerCards: CardHolder[];

  constructor(private roleComponent: RoleComponent) {
  }

  ngOnInit() {
    this.players = this.roleComponent.packet.players.map(p => p as CardHolder).filter(p => p.card.name === 'Werewolf' && p.name !== this.roleComponent.playerName);
    this.centerCards = this.roleComponent.packet.centerCards as CardHolder[];
  }
}
