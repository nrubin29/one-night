import Player = require('./player');
import CardHolder from '../common/card-holder';

class GamePlayer extends CardHolder {
  vote: GamePlayer;

  constructor(public player: Player) {
    super(player.name);
  }

  get json(): CardHolder {
    return {
      name: this.name,
      card: this.card,
      originalCard: this.originalCard,
      tokens: this.tokens
    };
  }
}

export = GamePlayer;
