import {Component, Input} from '@angular/core';
import {SocketService} from "../../services/socket.service";
import {Router} from "@angular/router";

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
    this.socketService.connect(this.id, this.name);
    this.socketService.stream.subscribe(data => {
      if (data.event === 'join') {
        this.socketService.data = data.players;
        this.router.navigate(['/lobby']);
      }
    });
  }
}
