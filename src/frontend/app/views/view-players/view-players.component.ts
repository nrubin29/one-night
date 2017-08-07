import {Component, OnInit} from '@angular/core';
import {SocketService} from "../../services/socket.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-view-people',
  templateUrl: './view-players.component.html',
  styleUrls: ['./view-players.component.scss']
})
export class ViewPlayersComponent implements OnInit {
  players: string[];

  constructor(private socketService: SocketService, private router: Router) {
  }

  ngOnInit() {
    this.players = this.socketService.data.players;

    this.socketService.stream.subscribe(data => {
      if (data.event === 'action-end') {
        this.router.navigate(['/night']);
      }
    });
  }
}
