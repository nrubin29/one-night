import {State} from '../../state-machine';
import ToggleTokenPacket from '../../../common/packets/toggle-token.packet';
import Packet from "../../../common/packets/packet";
import UpdateTokensPacket from "../../../common/packets/update-tokens.packet";
import DayPacket from "../../../common/packets/day.packet";
import Player = require('../../player');
import Game = require('../../game');
import VotingState = require('./voting-state');

class DayState extends State<Game> {
  start() {
    this.owner.lobby.broadcast(new DayPacket(this.owner.players.map(p => p.json)));

    setTimeout(() => {
      this.owner.stateMachine.toState(new VotingState(this.owner));
    }, 10 * 1000);
  }

  handlePacket(player: Player, packet: Packet) {
    if (packet.name === 'toggle-token') {
      const toggleTokenPacket = packet as ToggleTokenPacket;
      const gamePlayer = this.owner.getGamePlayerByName(toggleTokenPacket.player.name);
      gamePlayer.toggleToken(toggleTokenPacket.role);
      this.owner.lobby.broadcast(new UpdateTokensPacket(gamePlayer.json));
    }
  }

  end() {
  }
}

export = DayState;
