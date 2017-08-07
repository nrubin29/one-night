import {Component, Input, OnInit} from '@angular/core';
import Card from '../../../../common/card';
import {CardListener} from '../card/card-listener';

@Component({
  selector: 'app-view-cards',
  templateUrl: './view-cards.component.html',
  styleUrls: ['./view-cards.component.scss']
})
export class ViewCardsComponent implements OnInit, CardListener {
  @Input() cards: Card[];
  @Input() count: number;
  private flippedIndices: number[];
  listener: CardListener;

  ngOnInit() {
    this.flippedIndices = [];
    this.listener = this;
  }

  canFlip(index: number) {
    return this.flippedIndices.indexOf(index) === -1 && this.flippedIndices.length < this.count;
  }

  flipped(index: number) {
    if (this.flippedIndices.indexOf(index) === -1) {
      this.flippedIndices.push(index);
    }
  }
}
