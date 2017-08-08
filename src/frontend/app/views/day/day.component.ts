import { Component, OnInit } from '@angular/core';
import { SocketService } from '../../services/socket.service';
import { Router } from '@angular/router';
import { PlayerComponent } from '../../components/player/player.component';
import CardHolder from '../../../../common/card-holder';
import DayPacket from "../../../../common/packets/day.packet";
import UpdateTokensPacket from "../../../../common/packets/update-tokens.packet";

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.scss']
})
export class DayComponent implements OnInit {
  players: CardHolder[];
  playerComponents: PlayerComponent[];

  constructor(private socketService: SocketService, private router: Router) {
  }

  ngOnInit() {
    this.players = (this.socketService.lastPacket as DayPacket).players;
    this.playerComponents = [];

    this.socketService.stream.subscribe(packet => {
      if (packet.name === 'update-tokens') {
        const updateTokensPacket = packet as UpdateTokensPacket;
        this.playerComponents.find(pC => pC.player.name === updateTokensPacket.player.name).player = updateTokensPacket.player;
      }

      else if (packet.name === 'vote') {
        this.socketService.lastPacket = packet;
        this.router.navigate(['/vote']);
      }
    });
  }

  add(playerComponent: PlayerComponent) {
    this.playerComponents.push(playerComponent);
  }
}
