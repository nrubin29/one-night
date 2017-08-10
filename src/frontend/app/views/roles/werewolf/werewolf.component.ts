import { Component, OnInit } from '@angular/core';
import CardHolder from "../../../../../common/card-holder";
import { RoleComponent } from '../../role/role.component';
import { SocketService } from '../../../services/socket.service';

@Component({
  selector: 'app-werewolf',
  templateUrl: './werewolf.component.html',
  styleUrls: ['./werewolf.component.scss']
})
export class WerewolfComponent implements OnInit {
  players: CardHolder[];
  centerCards: CardHolder[];

  constructor(private roleComponent: RoleComponent, private socketService: SocketService) {
  }

  ngOnInit() {
    this.players = this.roleComponent.packet.players.filter(p => p.card.name === 'Werewolf' && p.name !== this.socketService.name);
    this.centerCards = this.roleComponent.packet.centerCards as CardHolder[];
  }
}
