import Card from '../common/card';

class Deck {
  cards: Card[]; // Contains all cards, including duplicates.
  roles: Card[]; // Contains all cards, excluding duplicates. Could be a get function.

  constructor(cards: Card[]) {
    this.cards = cards;
    this.roles = cards;
    // TODO: Remove duplicates but maintain order.
  }
}

export = Deck;
