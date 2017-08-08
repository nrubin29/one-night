import { Component, OnInit } from '@angular/core';
import { SocketService } from '../../services/socket.service';
import { Router } from '@angular/router';
import JoinPacket from '../../../../common/packets/join.packet';
import StringPacket from '../../../../common/packets/string.packet';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent implements OnInit {
  players: string[];

  constructor(private socketService: SocketService, private router: Router) {
  }

  ngOnInit() {
    this.players = (this.socketService.lastPacket as JoinPacket).players;
    this.socketService.stream.subscribe(packet => {
      if (packet.name === 'join') {
        this.players = (packet as JoinPacket).players;
      }

      else if (packet.name === 'start') {
        this.router.navigate(['/card']);
      }
    });
  }

  start() {
    this.socketService.emit(new StringPacket('start'));
  }
}
