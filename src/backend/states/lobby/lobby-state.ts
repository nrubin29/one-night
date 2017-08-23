import {State} from '../../state-machine';
import Packet from '../../../common/packets/packet';
import StringPacket from '../../../common/packets/string.packet';
import JoinPacket from '../../../common/packets/join.packet';
import Player = require('../../player');
import Lobby = require('../../lobby');
import GameState = require('./game-state');

export class LobbyState extends State<Lobby> {
  start() {
    this.owner.broadcast(new StringPacket('lobby'));

    // This is to send the lobby data to players who are returning from a finished game.
    for (let player of this.owner.players) {
      player.emit(new JoinPacket(this.owner.id, this.owner.players.map(p => p.name), this.owner.deck.cards.length - 3));
    }
  }

  handlePacket(player: Player, packet: Packet) {
    if (packet.name === 'start' && this.owner.players.length === this.owner.deck.cards.length - 3) {
      this.owner.stateMachine.toState(new GameState(this.owner));
    }
  }

  end() {
  }
}
