import { Component, Input } from '@angular/core';
import { SocketService } from '../../services/socket.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  @Input() id: number;

  constructor(private socketService: SocketService, private router: Router) {}

  join() {
    this.socketService.connect(this.id).then(() => {
      this.socketService.stream.subscribe(packet => {
        if (packet.name === 'connect') {
          this.router.navigate(['/join']);
        }
      });
    });
  }

  create() {
    this.router.navigate(['/setup']);
  }
}
