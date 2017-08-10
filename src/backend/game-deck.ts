import Card from '../common/card';
import Deck = require('./deck');
import shuffle = require('shuffle-array');

class GameDeck {
  cards: Card[];
  index = 0;

  constructor(deck: Deck) {
    // TODO: Turn off card shuffling for now.
    this.cards = shuffle(deck.cards, {copy: true});
    // this.cards = deck.cards;
  }

  dealCard(): Card {
    return this.cards[this.index++];
  }
}

export = GameDeck;
