import {Component, OnInit} from '@angular/core';
import {SocketService} from '../../services/socket.service';
import {Router} from '@angular/router';
import ActionStartPacket from '../../../../common/packets/action-start.packet';
import {AudioService} from '../../services/audio.service';
import ActionAnnouncePacket from '../../../../common/packets/action-announce.packet';

@Component({
  selector: 'app-night',
  templateUrl: './night.component.html',
  styleUrls: ['./night.component.scss']
})
export class NightComponent implements OnInit {

  constructor(private socketService: SocketService, private audioService: AudioService, private router: Router) {
  }

  ngOnInit() {
    this.socketService.stream.subscribe(packet => {
      if (packet.name === 'action-announce') {
        const announcePacket = packet as ActionAnnouncePacket;
        this.audioService.playRole(announcePacket.role.name.toLowerCase().replace(' ', '') + '_name');
      }

      else if (packet.name === 'action-start') {
        this.socketService.lastPacket = packet;
        this.router.navigate(['/role', (packet as ActionStartPacket).role.name.toLowerCase().replace(' ', '-')]);
      }

      else if (packet.name === 'day') {
        this.audioService.pauseBackground();
        this.socketService.lastPacket = packet;
        this.router.navigate(['/day']);
      }
    });
  }
}
