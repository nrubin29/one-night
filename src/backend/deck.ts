import Card from "../common/card";
import shuffle = require("shuffle-array");

class Deck {
  roles: Set<Card>;
  index = 0;

  constructor(public cards: Card[]) {
    this.roles = new Set<Card>(cards);
    shuffle(this.cards);
  }

  dealCard(): Card {
    return this.cards[this.index++];
  }
}

export = Deck;