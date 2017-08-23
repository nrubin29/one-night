import Player = require('./player');
import CardHolder from '../common/card-holder';

class GamePlayer extends CardHolder {
  vote: GamePlayer;

  constructor(public player: Player) {
    super(player.name);
  }

  serialize(): CardHolder {
    return {
      name: this.name,
      owner: this.owner,
      card: this.card,
      originalCard: this.originalCard,
      tokens: this.tokens
    };
  }
}

export = GamePlayer;
