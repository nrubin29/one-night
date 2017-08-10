import { Component, OnInit } from '@angular/core';
import CardHolder from '../../../../../common/card-holder';
import { RoleComponent } from '../../role/role.component';
import { SocketService } from '../../../services/socket.service';
import SwapPacket from '../../../../../common/packets/swap.packet';

@Component({
  selector: 'app-robber',
  templateUrl: './robber.component.html',
  styleUrls: ['./robber.component.scss']
})
export class RobberComponent implements OnInit {
  players: CardHolder[];
  player: CardHolder;

  constructor(private roleComponent: RoleComponent, private socketService: SocketService) {
  }

  ngOnInit() {
    this.players = this.roleComponent.packet.players.filter(p => p.name !== this.socketService.name);
  }

  select(selected: CardHolder[]) {
    if (selected.length > 0) {
      this.player = selected[0];
      this.socketService.emit(new SwapPacket(this.player, null));
    }
  }
}
