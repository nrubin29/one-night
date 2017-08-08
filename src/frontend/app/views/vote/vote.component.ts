import {Component, OnInit} from '@angular/core';
import {SocketService} from '../../services/socket.service';
import {Router} from '@angular/router';
import {Player} from '../../player';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.scss']
})
export class VoteComponent implements OnInit {
  players: Player[];
  selected: Player;

  constructor(private socketService: SocketService, private router: Router) {
  }

  ngOnInit() {
    this.players = this.socketService.data.players as Player[];
    this.socketService.stream.subscribe(data => {
      if (data.event === 'end') {
        this.socketService.data = data;
        this.router.navigate(['/end']);
      }
    });
  }

  tap(player: Player) {
    this.selected = player;

    this.socketService.emit({
      event: 'vote',
      player: player ? player.name : null
    });
  }
}
