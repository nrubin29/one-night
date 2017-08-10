import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import CardHolder from '../../../../common/card-holder';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() cardHolder: CardHolder;
  @Input() canFlip?: boolean;
  @Output() flipped?: EventEmitter<void> = new EventEmitter<void>();
  @Input() visible?: boolean;

  ngOnInit() {
    if (this.canFlip === undefined) {
      this.canFlip = true;
    }
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
