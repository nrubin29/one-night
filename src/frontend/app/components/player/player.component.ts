import {Component, Input, OnInit} from '@angular/core';
import Card from '../../../../common/card';
import {Player} from '../../player';
import {SocketService} from '../../services/socket.service';
import {DayComponent} from '../../views/day/day.component';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {
  @Input() player: Player;
  tapped = false;
  allRoles: Card[];

  constructor(private socketService: SocketService, private dayComponent: DayComponent) {
  }

  ngOnInit() {
    this.dayComponent.add(this);
    this.allRoles = this.socketService.allRoles;
  }

  addRole(role: Card) {
    this.player.tokens.push(role);
  }

  removeRole(role: Card) {
    this.player.tokens = this.player.tokens.filter(r => r.name !== role.name);
  }

  tap() {
    this.tapped = !this.tapped;
  }

  tapRole(role: Card) {
    this.tapped = false;

    this.socketService.emit({
      event: 'toggle-token',
      player: this.player.name,
      role: role
    });
  }
}
