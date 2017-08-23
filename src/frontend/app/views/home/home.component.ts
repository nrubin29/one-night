import {Component, Input} from '@angular/core';
import {SocketService} from '../../services/socket.service';
import {Router} from '@angular/router';
import ErrorPacket from '../../../../common/packets/error.packet';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  @Input() id: number;
  error: string;

  constructor(private socketService: SocketService, private router: Router) {}

  join() {
    this.socketService.connect(this.id).then(() => {
      this.socketService.stream.subscribe(packet => {
        if (packet.name === 'connect') {
          this.router.navigate(['/join']);
        }

        else if (packet.name === 'error') {
          this.error = (packet as ErrorPacket).message;
        }
      });
    });
  }

  create() {
    this.router.navigate(['/setup']);
  }
}
