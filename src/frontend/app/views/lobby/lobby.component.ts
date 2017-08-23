import {Component, OnInit} from '@angular/core';
import {SocketService} from '../../services/socket.service';
import {Router} from '@angular/router';
import JoinPacket from '../../../../common/packets/join.packet';
import StringPacket from '../../../../common/packets/string.packet';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent implements OnInit {
  lobbyId: number;
  players: string[];
  target: number;

  constructor(private socketService: SocketService, private router: Router) {
  }

  ngOnInit() {
    const joinPacket = this.socketService.lastPacket as JoinPacket;
    this.lobbyId = joinPacket.lobbyId;
    this.players = joinPacket.players;
    this.target = joinPacket.target;


    this.socketService.stream.subscribe(packet => {
      if (packet.name === 'join') {
        const joinPacket = packet as JoinPacket;
        this.lobbyId = joinPacket.lobbyId;
        this.players = joinPacket.players;
        this.target = joinPacket.target;
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
