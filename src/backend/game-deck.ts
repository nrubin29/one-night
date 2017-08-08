import Card from '../common/card';
import Deck = require('./deck');

class GameDeck {
  cards: Card[];
  index = 0;

  constructor(deck: Deck) {
    // TODO: Shuffle cards.
    // this.cards = shuffle(deck.cards, {copy: true});
    this.cards = deck.cards;
  }

  dealCard(): Card {
    return this.cards[this.index++];
  }
}

export = GameDeck;
