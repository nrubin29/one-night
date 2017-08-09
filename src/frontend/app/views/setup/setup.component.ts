import { Component, OnInit } from '@angular/core';
import Card from '../../../../common/card';
import Cards from '../../../../common/cards/cards';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { SocketService } from '../../services/socket.service';
import GameSettings from '../../../../common/game-settings';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.scss']
})
export class SetupComponent implements OnInit {
  roles: Card[];
  selected: number[];
  gameSettings: GameSettings;

  constructor(private socketService: SocketService, private router: Router, private http: Http) {
  }

  ngOnInit() {
    this.roles = Cards.getAllCards();
    this.selected = [];
    this.gameSettings = new GameSettings();
  }

  submit() {
    this.gameSettings.cards = this.selected.map(i => this.roles[i]);

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
}
