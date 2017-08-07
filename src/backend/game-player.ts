import Card from '../common/card';
import Player = require('./player');

class GamePlayer {
  card: Card;

  constructor(public player: Player) {
  }
}

export = GamePlayer;
