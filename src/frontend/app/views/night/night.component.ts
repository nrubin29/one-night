import { Component, OnInit } from '@angular/core';
import { SocketService } from '../../services/socket.service';
import { Router } from '@angular/router';
import ActionStartPacket from '../../../../common/packets/action-start.packet';

@Component({
  selector: 'app-night',
  templateUrl: './night.component.html',
  styleUrls: ['./night.component.scss']
})
export class NightComponent implements OnInit {

  constructor(private socketService: SocketService, private router: Router) {
  }

  ngOnInit() {
    this.socketService.stream.subscribe(packet => {
      if (packet.name === 'action-start') {
        this.socketService.lastPacket = packet;
        this.router.navigate(['/role', (packet as ActionStartPacket).role.name.toLowerCase().replace(' ', '-')]);
      }

      else if (packet.name === 'day') {
        this.socketService.lastPacket = packet;
        this.router.navigate(['/day']);
      }
    });
  }
}
