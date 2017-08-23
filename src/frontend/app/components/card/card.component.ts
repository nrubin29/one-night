import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import CardHolder from '../../../../common/card-holder';
import Cards from '../../../../common/cards/cards';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() cardHolder: CardHolder;
  @Input() canFlip?: boolean;
  @Input() visible?: boolean;
  imageUrl: string;
  @Output() flipped?: EventEmitter<void> = new EventEmitter<void>();

  ngOnInit() {
    if (this.canFlip === undefined) {
      this.canFlip = true;
    }

    this.imageUrl = Cards.getImageURL(this.cardHolder.card);
  }

  flip() {
    if (this.canFlip) {
      this.visible = !this.visible;

      if (this.flipped) {
        this.flipped.emit();
      }
    }
  }
}
