import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-view-people',
  templateUrl: './view-players.component.html',
  styleUrls: ['./view-players.component.scss']
})
export class ViewPlayersComponent implements OnInit {
  @Input() players: string[];

  constructor() {
  }

  ngOnInit() {
  }
}
