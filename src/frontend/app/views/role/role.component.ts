import { Component, OnInit } from '@angular/core';
import { SocketService } from '../../services/socket.service';
import ActionStartPacket from '../../../../common/packets/action-start.packet';
import { Router } from '@angular/router';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit {
  packet: ActionStartPacket;
  playerName: string;

  constructor(private socketService: SocketService, private router: Router) {
  }

  ngOnInit() {
    this.packet = this.socketService.lastPacket as ActionStartPacket;
    this.playerName = this.socketService.name;

    this.socketService.stream.subscribe(packet => {
      if (packet.name === 'action-end') {
        this.router.navigate(['/night']);
      }
    });
  }
}
