import { Component, Input, OnInit } from '@angular/core';
import { CardListener } from './card-listener';
import CardHolder from '../../../../common/card-holder';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() card: CardHolder;
  @Input() listener?: CardListener;
  @Input() index?: number;
  visible = false;

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
