import Card from '../common/card';

class Deck {
  cards: Card[]; // Contains all cards, including duplicates.
  roles: Card[]; // Contains all cards, excluding duplicates. Could be a get function.

  constructor(cards: Card[]) {
    this.cards = cards;
    this.roles = Array.from(new Set(cards.map(c => c.name))).map(n => this.cards.find(c => c.name === n));
  }

  get target(): number {
    return this.cards.length - 3;
  }
}

export = Deck;
