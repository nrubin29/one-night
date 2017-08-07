import {Component, OnInit} from '@angular/core';
import {SocketService} from "../../services/socket.service";
import {Router} from "@angular/router";
import Card from "../../../../common/card";

@Component({
  selector: 'app-view-cards',
  templateUrl: './view-cards.component.html',
  styleUrls: ['./view-cards.component.scss']
})
export class ViewCardsComponent implements OnInit {
  cards: Card[];
  count: number;

  constructor(private socketService: SocketService, private router: Router) {
  }

  ngOnInit() {
    this.cards = this.socketService.data.cards;
    this.count = this.socketService.data.count;

    this.socketService.stream.subscribe(data => {
      if (data.event === 'action-end') {
        this.router.navigate(['/night']);
      }
    });
  }
}
