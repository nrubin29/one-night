import Card from './card';

class CardHolder {
  originalCard: Card;
  tokens: Card[];

  constructor(public name: string, public card?: Card) {
    this.name = name;
    this.tokens = [];
  }

  hasToken?(role: Card): boolean {
    return this.tokens.filter(t => t.name === role.name).length > 0;
  }

  toggleToken?(role: Card) {
    if (this.hasToken(role)) {
      this.tokens = this.tokens.filter(t => t.name !== role.name);
    }

    else {
      this.tokens.push(role);
    }
  }
}

export default CardHolder;
