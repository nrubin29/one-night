import {Component, OnInit} from '@angular/core';
import {SocketService} from '../../services/socket.service';
import {AudioService} from '../../services/audio.service';
import ActionAnnouncePacket from '../../../../common/packets/action-announce.packet';
import JoinLobbyPacket from '../../../../common/packets/join-lobby.packet';

@Component({
  selector: 'app-audio',
  templateUrl: './audio.component.html',
  styleUrls: ['./audio.component.scss']
})
export class AudioComponent implements OnInit {
  id: number;

  constructor(private socketService: SocketService, private audioService: AudioService) {
  }

  ngOnInit() {
    this.id = (this.socketService.lastPacket as JoinLobbyPacket).id;

    this.socketService.stream.subscribe(packet => {
      if (packet.name === 'to-night') {
        this.audioService.playBackground('disco');
      }

      else if (packet.name === 'action-announce') {
        const announcePacket = packet as ActionAnnouncePacket;
        this.audioService.playRole(announcePacket.role.name.toLowerCase().replace(' ', '') + '_name');
      }

      else if (packet.name === 'day') {
        this.audioService.pauseBackground();
      }
    });
  }
}