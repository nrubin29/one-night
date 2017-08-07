import {Component, OnInit} from '@angular/core';
import {SocketService} from '../../services/socket.service';
import {Router} from '@angular/router';
import {Player} from '../../player';
import {PlayerComponent} from '../../components/player/player.component';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.scss']
})
export class DayComponent implements OnInit {
  players: Player[];
  playerComponents: PlayerComponent[];

  constructor(private socketService: SocketService, private router: Router) {
  }

  ngOnInit() {
    this.players = this.socketService.data.players.map(name => new Player(name));
    this.playerComponents = [];

    this.socketService.stream.subscribe(data => {
      if (data.event === 'add-token') {
        this.playerComponents.find(pC => pC.player.name === data.player).addRole(data.role);
      }

      else if (data.event === 'remove-token') {
        this.playerComponents.find(pC => pC.player.name === data.player).removeRole(data.role);
      }

      else if (data.event === 'vote') {
        this.socketService.data = data;
        this.router.navigate(['/vote']);
      }
    });
  }

  add(playerComponent: PlayerComponent) {
    this.playerComponents.push(playerComponent);
  }
}
