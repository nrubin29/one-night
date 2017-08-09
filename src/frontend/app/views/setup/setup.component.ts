import {Component, OnInit} from '@angular/core';
import Card from '../../../../common/card';
import Cards from '../../../../common/cards/cards';
import {Http} from '@angular/http';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.scss']
})
export class SetupComponent implements OnInit {
  roles: Card[];
  selected: number[];
  lobbyId: number;

  constructor(private http: Http) {
  }

  ngOnInit() {
    this.roles = Cards.getAllCards();
    this.selected = [];
  }

  submit() {
    this.http.post('/api/lobby/create', {cards: this.selected.map(i => this.roles[i])}).subscribe(data => this.lobbyId = data.json().id);
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
