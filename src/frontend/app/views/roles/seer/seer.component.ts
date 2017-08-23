import {Component, OnInit} from '@angular/core';
import CardHolder from '../../../../../common/card-holder';
import {RoleComponent} from '../../role/role.component';
import {SocketService} from '../../../services/socket.service';

@Component({
  selector: 'app-seer',
  templateUrl: './seer.component.html',
  styleUrls: ['./seer.component.scss']
})
export class SeerComponent implements OnInit {
  centerCards: CardHolder[];
  players: CardHolder[];
  flipped: string;

  constructor(private roleComponent: RoleComponent, private socketService: SocketService) {
  }

  ngOnInit() {
    this.centerCards = this.roleComponent.packet.centerCards as CardHolder[];
    this.players = this.roleComponent.packet.players.filter(p => p.name !== this.socketService.name);
  }
}
