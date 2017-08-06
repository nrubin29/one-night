import {Component, OnInit} from '@angular/core';
import {SocketService} from "../../services/socket.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent implements OnInit {
  players: any[];

  constructor(private socketService: SocketService, private router: Router) {}

  ngOnInit() {
    this.players = this.socketService.data;
    this.socketService.stream.subscribe(data => {
        if (data.event === 'join') {
            this.players = data.players;
        }

        else if (data.event === 'start') {
          this.router.navigate(['/card']);
        }
    });
  }

  start() {
      this.socketService.emit({
          event: 'start'
      });
  }
}
