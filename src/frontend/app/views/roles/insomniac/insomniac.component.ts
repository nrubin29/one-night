import { Component, OnInit } from '@angular/core';
import { RoleComponent } from '../../role/role.component';
import CardHolder from '../../../../../common/card-holder';
import { SocketService } from '../../../services/socket.service';

@Component({
  selector: 'app-insomniac',
  templateUrl: './insomniac.component.html',
  styleUrls: ['./insomniac.component.scss']
})
export class InsomniacComponent implements OnInit {
  player: CardHolder;

  constructor(private roleComponent: RoleComponent, private socketService: SocketService) {
  }

  ngOnInit() {
    this.player = this.roleComponent.packet.players.find(p => p.name === this.socketService.name);
  }
}
