import { Component, Input } from '@angular/core';
import { SocketService } from '../../services/socket.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  @Input() name: string;
  @Input() id: number;

  constructor(private socketService: SocketService, private router: Router) {}

  join() {
    this.socketService.connect(this.id, this.name).then(() => {
      this.socketService.stream.subscribe(packet => {
        if (packet.name === 'join') {
          this.socketService.lastPacket = packet;
          this.router.navigate(['/lobby']);
        }
      });
    });
  }

  create() {
    this.router.navigate(['/setup']);
  }
}
