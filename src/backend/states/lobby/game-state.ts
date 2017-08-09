import {State} from '../../state-machine';
import Packet from '../../../common/packets/packet';
import StringPacket from '../../../common/packets/string.packet';
import Player = require('../../player');
import Lobby = require('../../lobby');
import Game = require('../../game');

class GameState extends State<Lobby> {
  private game: Game;

  start() {
    this.owner.broadcast(new StringPacket('start'));

    this.game = new Game(this.owner);
    this.game.start();
  }

  handlePacket(player: Player, packet: Packet) {
    this.game.stateMachine.handlePacket(player, packet);
  }

  end() {
  }
}

export = GameState;
