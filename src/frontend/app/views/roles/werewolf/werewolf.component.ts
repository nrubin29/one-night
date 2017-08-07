import {Component, OnInit} from '@angular/core';
import {SocketService} from '../../../services/socket.service';
import {Router} from '@angular/router';
import Card from '../../../../../common/card';

@Component({
  selector: 'app-werewolf',
  templateUrl: './werewolf.component.html',
  styleUrls: ['./werewolf.component.scss']
})
export class WerewolfComponent implements OnInit {
  players: string[];
  centerCards: Card[];

  constructor(private socketService: SocketService, private router: Router) {
  }

  ngOnInit() {
    this.players = this.socketService.data.players.filter(p => p.role === 'Werewolf' && p.name !== this.socketService.name).map(p => p.name);
    this.centerCards = this.socketService.data.centerCards as Card[];

    this.socketService.stream.subscribe(data => {
      if (data.event === 'action-end') {
        this.router.navigate(['/night']);
      }
    });
  }
}
