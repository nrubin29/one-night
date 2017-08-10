import { Component, OnInit } from '@angular/core';
import CardHolder from '../../../../../common/card-holder';
import SwapPacket from '../../../../../common/packets/swap.packet';
import { RoleComponent } from '../../role/role.component';
import { SocketService } from '../../../services/socket.service';

@Component({
  selector: 'app-troublemaker',
  templateUrl: './troublemaker.component.html',
  styleUrls: ['./troublemaker.component.scss']
})
export class TroublemakerComponent implements OnInit {
  players: CardHolder[];
  selected: CardHolder[];

  constructor(private roleComponent: RoleComponent, private socketService: SocketService) {
  }

  ngOnInit() {
    this.players = this.roleComponent.packet.players.filter(p => p.name !== this.socketService.name);
    this.selected = [];
  }

  select(selected: CardHolder[]) {
    if (selected.length >= 2) {
      this.selected = selected;
      this.socketService.emit(new SwapPacket(this.selected[0], this.selected[1]));
    }
  }
}
