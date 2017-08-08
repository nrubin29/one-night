import { Component, OnInit } from '@angular/core';
import CardHolder from '../../../../../common/card-holder';
import { SocketService } from '../../../services/socket.service';
import { Router } from '@angular/router';
import ActionStartPacket from '../../../../../common/packets/action-start.packet';

@Component({
  selector: 'app-mason',
  templateUrl: './mason.component.html',
  styleUrls: ['./mason.component.scss']
})
export class MasonComponent implements OnInit {
  players: CardHolder[];

  constructor(private socketService: SocketService, private router: Router) {
  }

  ngOnInit() {
    const actionStartPacket = this.socketService.lastPacket as ActionStartPacket;
    this.players = actionStartPacket.players.map(p => p as CardHolder).filter(p => p.card.name === 'Mason');

    this.socketService.stream.subscribe(packet => {
      if (packet.name === 'action-end') {
        this.router.navigate(['/night']);
      }
    });
  }
}
