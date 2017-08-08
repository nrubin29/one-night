import { State } from '../../state-machine';
import Packet from '../../../common/packets/packet';
import StringPacket from '../../../common/packets/string.packet';
import Player = require('../../player');
import Lobby = require('../../lobby');
import GameState = require('./game-state');

class LobbyState extends State<Lobby> {
  start() {
    this.owner.broadcast(new StringPacket('lobby'));
  }

  handlePacket(player: Player, packet: Packet) {
    if (packet.name === 'start') {
      this.owner.stateMachine.toState(new GameState(this.owner));
    }
  }

  end() {
  }
}

export = LobbyState;
