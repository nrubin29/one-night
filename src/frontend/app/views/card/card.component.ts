import {Component, OnInit} from '@angular/core';
import {SocketService} from "../../services/socket.service";
import {Router} from "@angular/router";
import Card from "../../../../common/card";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  card: Card;

  constructor(private socketService: SocketService, private router: Router) {}

  ngOnInit() {
    this.socketService.stream.subscribe(data => {
      if (data.event === 'card') {
        this.card = data.card as Card;
      }

      else if (data.event === 'ready') {
        this.router.navigate(['/night']);
      }
    });
  }

  ready() {
    this.socketService.emit({
      'event': 'ready'
    });
  }
}
