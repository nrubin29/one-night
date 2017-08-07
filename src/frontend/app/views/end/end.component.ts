import {Component, OnInit} from '@angular/core';
import {SocketService} from "../../services/socket.service";
import {Router} from "@angular/router";
import Card from "../../../../common/card";

@Component({
  selector: 'app-end',
  templateUrl: './end.component.html',
  styleUrls: ['./end.component.scss']
})
export class EndComponent implements OnInit {
  // TODO: Add lobby button to return to lobby.

  playerData: EndPlayerData[];

  constructor(private socketService: SocketService, private router: Router) {
  }

  ngOnInit() {
    this.playerData = this.socketService.data.players as EndPlayerData[];
    this.socketService.stream.subscribe(data => {
      if (data.event === 'lobby') {
        this.router.navigate(['/lobby']);
      }
    });
  }
}

interface EndPlayerData {
  name: string;
  role: Card;
  originalRole: Card;
  killed: boolean;
  votedBy: string[];
}
