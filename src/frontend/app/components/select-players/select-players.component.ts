import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import CardHolder from '../../../../common/card-holder';

@Component({
  selector: 'app-select-players',
  templateUrl: './select-players.component.html',
  styleUrls: ['./select-players.component.scss']
})
export class SelectPlayersComponent implements OnInit {
  @Input() players: CardHolder[];
  @Input() count: number;
  @Input() lockSelection?: boolean;
  @Output() selected: EventEmitter<CardHolder[]> = new EventEmitter<CardHolder[]>();
  private selectedIndices: number[];

  ngOnInit() {
    this.selectedIndices = [];
  }

  isSelected(index: number | null) {
    return index !== null ? this.selectedIndices.indexOf(index) !== -1 : this.selectedIndices.length === 0;
  }

  select(index: number | null) {
    if (this.lockSelection) {
      if (this.selectedIndices.length === 0) {
        this.selectedIndices = [index];
      }
    }

    else if (index === null) {
      this.selectedIndices = [];
    }

    else if (this.count === 1) {
      this.selectedIndices = [index];
    }

    else if (this.isSelected(index)) {
      this.selectedIndices = this.selectedIndices.filter(i => i !== index);
    }

    else if (this.selectedIndices.length < this.count) {
      this.selectedIndices.push(index);
    }

    this.selected.emit(this.selectedIndices.map(i => this.players[i]));
  }
}
