import {Component, OnInit} from '@angular/core';
import Card from '../../../../common/card';
import Cards from '../../../../common/cards/cards';
import {Http} from '@angular/http';
import {Router} from '@angular/router';
import {SocketService} from '../../services/socket.service';
import GameSettings from '../../../../common/game-settings';
import GameSettingsPacket from '../../../../common/packets/game-settings.packet';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.scss']
})
export class SetupComponent implements OnInit {
  roles: Card[];
  selected: number[];
  gameSettings: GameSettings;
  isNew: boolean;

  constructor(private socketService: SocketService, private router: Router, private http: Http) {
  }

  ngOnInit() {
    this.roles = Cards.getAllCards();

    if (this.socketService.lastPacket) {
      this.gameSettings = (this.socketService.lastPacket as GameSettingsPacket).gameSettings;
      // this.selected = this.gameSettings.cards.map(c => this.roles.indexOf(c)); // TODO: Reload selected values.
      this.selected = [];

      this.socketService.stream.subscribe(packet => {
        if (packet.name === 'join') {
          this.socketService.lastPacket = packet;
          this.router.navigate(['/lobby']);
        }
      });
    }

    else {
      this.gameSettings = new GameSettings();
      this.selected = [];
      this.isNew = true;
    }
  }

  submit() {
    this.gameSettings.cards = this.selected.map(i => this.roles[i]);

    if (this.isNew) {
      this.http.post('/api/lobby/create', {settings: this.gameSettings}).subscribe(data => {
        this.socketService.connect(data.json().id).then(() => {
          this.socketService.stream.subscribe(packet => {
            if (packet.name === 'connect') {
              this.router.navigate(['/join']);
            }
          });
        });
      });
    }

    else {
      this.socketService.emit(new GameSettingsPacket(this.gameSettings));
    }
  }

  select(index: number) {
    if (this.isSelected(index)) {
      this.selected = this.selected.filter(i => i !== index);
    }

    else {
      this.selected.push(index);
    }
  }

  isSelected(index: number): boolean {
    return this.selected.indexOf(index) !== -1;
  }

  getImageUrl(card: Card) {
    return Cards.getImageURL(card);
  }
}
