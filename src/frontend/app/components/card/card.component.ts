import {Component, Input, OnInit} from '@angular/core';
import Card from '../../../../common/card';
import {CardListener} from './card-listener';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() card: Card;
  @Input() listener?: CardListener;
  @Input() index?: number;
  visible = false;

  constructor() {
  }

  ngOnInit() {
  }

  flip() {
    if (!this.listener || this.listener.canFlip(this.index)) {
      this.visible = !this.visible;

      if (this.listener) {
        this.listener.flipped(this.index);
      }
    }
  }
}
