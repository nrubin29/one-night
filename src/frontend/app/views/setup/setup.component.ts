import { Component, OnInit } from '@angular/core';
import Card from '../../../../common/card';
import Cards from '../../../../common/cards/cards';
import { Http } from '@angular/http';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.scss']
})
export class SetupComponent implements OnInit {
  roles: Card[];
  selected: Card[];
  lobbyId: number;

  constructor(private http: Http) {
  }

  ngOnInit() {
    this.roles = Cards.getAllCards();
    this.selected = [];
  }

  submit() {
    this.http.post('/api/lobby/create', {cards: this.selected}).subscribe(data => this.lobbyId = data.json().id);
  }

  select(role: Card) {
    if (this.isSelected(role)) {
      this.selected = this.selected.filter(r => r !== role);
    }

    else {
      this.selected.push(role);
    }
  }

  isSelected(role: Card): boolean {
    return this.selected.indexOf(role) !== -1;
  }
}
