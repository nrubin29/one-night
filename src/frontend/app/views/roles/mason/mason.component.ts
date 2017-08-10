import { Component, OnInit } from '@angular/core';
import CardHolder from '../../../../../common/card-holder';
import { RoleComponent } from '../../role/role.component';
import { SocketService } from '../../../services/socket.service';

@Component({
  selector: 'app-mason',
  templateUrl: './mason.component.html',
  styleUrls: ['./mason.component.scss']
})
export class MasonComponent implements OnInit {
  players: CardHolder[];

  constructor(private roleComponent: RoleComponent, private socketService: SocketService) {
  }

  ngOnInit() {
    this.players = this.roleComponent.packet.players.map(p => p as CardHolder).filter(p => p.card.name === 'Mason' && p.name !== this.socketService.name);
  }
}
