import { Component, Input, OnInit } from '@angular/core';
import { SocketService } from '../../services/socket.service';
import { Router } from '@angular/router';
import NamePacket from '../../../../common/packets/name.packet';

@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.scss']
})
export class JoinComponent implements OnInit {
  @Input() name: string;

  constructor(private socketService: SocketService, private router: Router) {
  }

  ngOnInit() {
    this.socketService.stream.subscribe(packet => {
      if (packet.name === 'join') {
        this.socketService.name = this.name;
        this.socketService.lastPacket = packet;
        this.router.navigate(['/lobby']);
      }
    });
  }

  join() {
    this.socketService.emit(new NamePacket(this.name));
  }
}
