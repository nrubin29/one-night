import {Component, Input, OnInit} from '@angular/core';
import Card from '../../../../common/card';
import {SocketService} from '../../services/socket.service';
import {DayComponent} from '../../views/day/day.component';
import CardHolder from '../../../../common/card-holder';
import ToggleTokenPacket from '../../../../common/packets/toggle-token.packet';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {
  @Input() player: CardHolder;
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
    this.socketService.emit(new ToggleTokenPacket(this.player, role));
  }
}
