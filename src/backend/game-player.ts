import Card from '../common/card';
import Player = require('./player');

class GamePlayer {
  originalCard: Card;
  private _card: Card;
  tokens: Card[];
  vote: GamePlayer;

  constructor(public player: Player) {
    this.tokens = [];
  }

  get card() {
    return this._card;
  }

  set card(card: Card) {
    if (this.originalCard === null) {
      this.originalCard = card;
    }

    this._card = card;
  }

  hasToken(role: Card): boolean {
    return this.tokens.findIndex(t => t.name === role.name) !== -1;
  }

  toggleToken(role: Card) {
    if (this.hasToken(role)) {
      this.tokens = this.tokens.filter(t => t.name !== role.name);
    }

    else {
      this.tokens.push(role);
    }
  }
}

export = GamePlayer;
