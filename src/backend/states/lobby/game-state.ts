import {State} from '../../state-machine';
import Player = require('../../player');
import Lobby = require('../../lobby');
import Game = require('../../game');
import Deck = require('../../deck');
import Cards = require('../../../common/cards/cards');

class GameState extends State<Lobby> {
  private game: Game;

  start() {
    this.game = new Game(this.parent, new Deck(Cards.getAllCards()));
    this.game.start();
  }

  handleEvent(player: Player, data: any) {
    this.game.stateMachine.handleEvent(player, data);
  }

  end() {
  }
}

export = GameState;
