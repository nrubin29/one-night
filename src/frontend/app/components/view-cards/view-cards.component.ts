import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import CardHolder from '../../../../common/card-holder';

@Component({
  selector: 'app-view-cards',
  templateUrl: './view-cards.component.html',
  styleUrls: ['./view-cards.component.scss']
})
export class ViewCardsComponent implements OnInit {
  @Input() cards: CardHolder[];
  @Input() count: number;
  @Input() disabled: boolean;
  @Output() didFlip: EventEmitter<number> = new EventEmitter<number>();
  private flippedIndices: number[];

  ngOnInit() {
    this.flippedIndices = [];
  }

  canFlip(index: number) {
    return !this.disabled && this.flippedIndices.indexOf(index) === -1 && this.flippedIndices.length < this.count;
  }

  flipped(index: number) {
    if (this.flippedIndices.indexOf(index) === -1) {
      this.flippedIndices.push(index);
      this.didFlip.emit(index);
    }
  }
}
