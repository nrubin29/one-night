import Player = require('./player');
import CardHolder from '../common/card-holder';

class GamePlayer {
  cardHolder: CardHolder;
  vote: GamePlayer;

  constructor(public player: Player) {
    this.cardHolder = new CardHolder(player.name);
  }
}

export = GamePlayer;
