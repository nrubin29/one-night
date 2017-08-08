import { Component, OnInit } from '@angular/core';
import CardHolder from '../../../../../common/card-holder';
import ActionStartPacket from '../../../../../common/packets/action-start.packet';
import { Router } from '@angular/router';
import { SocketService } from '../../../services/socket.service';

@Component({
  selector: 'app-minion',
  templateUrl: './minion.component.html',
  styleUrls: ['./minion.component.scss']
})
export class MinionComponent implements OnInit {
  players: CardHolder[];

  constructor(private socketService: SocketService, private router: Router) {
  }

  ngOnInit() {
    const actionStartPacket = this.socketService.lastPacket as ActionStartPacket;
    this.players = actionStartPacket.players.map(p => p as CardHolder).filter(p => p.card.name === 'Werewolf');

    this.socketService.stream.subscribe(packet => {
      if (packet.name === 'action-end') {
        this.router.navigate(['/night']);
      }
    });
  }
}
