import { Component, OnInit } from '@angular/core';
import { SocketService } from '../../../services/socket.service';
import { Router } from '@angular/router';
import CardHolder from "../../../../../common/card-holder";
import ActionStartPacket from "../../../../../common/packets/action-start.packet";

@Component({
  selector: 'app-werewolf',
  templateUrl: './werewolf.component.html',
  styleUrls: ['./werewolf.component.scss']
})
export class WerewolfComponent implements OnInit {
  players: CardHolder[];
  centerCards: CardHolder[];

  constructor(private socketService: SocketService, private router: Router) {
  }

  ngOnInit() {
    const actionStartPacket = this.socketService.lastPacket as ActionStartPacket;
    this.players = actionStartPacket.players.map(p => p as CardHolder).filter(p => p.card.name === 'Werewolf' && p.name !== this.socketService.name);
    this.centerCards = actionStartPacket.centerCards as CardHolder[];

    this.socketService.stream.subscribe(packet => {
      if (packet.name === 'action-end') {
        this.router.navigate(['/night']);
      }
    });
  }
}
