import { Component, OnInit } from '@angular/core';
import { SocketService } from '../../services/socket.service';
import { Router } from '@angular/router';
import EndData from '../../../../common/end-data';
import EndPacket from '../../../../common/packets/end.packet';
import StringPacket from '../../../../common/packets/string.packet';

@Component({
  selector: 'app-end',
  templateUrl: './end.component.html',
  styleUrls: ['./end.component.scss']
})
export class EndComponent implements OnInit {
  playerData: EndData[];

  constructor(private socketService: SocketService, private router: Router) {
  }

  ngOnInit() {
    this.playerData = (this.socketService.lastPacket as EndPacket).players;

    this.socketService.stream.subscribe(packet => {
      if (packet.name === 'lobby') {
        this.router.navigate(['/lobby']);
      }
    });
  }

  tap() {
    this.socketService.emit(new StringPacket('lobby'));
  }
}
