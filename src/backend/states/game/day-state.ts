import {State} from '../../state-machine';
import ToggleTokenPacket from '../../../common/packets/toggle-token.packet';
import Packet from "../../../common/packets/packet";
import UpdateTokensPacket from "../../../common/packets/update-tokens.packet";
import DayPacket from "../../../common/packets/day.packet";
import CardHolder from '../../../common/card-holder';
import Player = require('../../player');
import Game = require('../../game');
import VotingState = require('./voting-state');

class DayState extends State<Game> {
  start() {
    this.owner.lobby.broadcast(new DayPacket(this.owner.players.map(p => p.serialize()).concat(this.owner.centerCards), this.owner.lobby.gameSettings.dayTimer));

    setTimeout(() => {
      this.owner.stateMachine.toState(new VotingState(this.owner));
    }, this.owner.lobby.gameSettings.dayTimer * 1000);
  }

  handlePacket(player: Player, packet: Packet) {
    if (packet.name === 'toggle-token') {
      const toggleTokenPacket = packet as ToggleTokenPacket;
      let gamePlayer: CardHolder;

      if (toggleTokenPacket.player.name.startsWith('Center')) {
        gamePlayer = this.owner.centerCards.find(c => c.name === toggleTokenPacket.player.name);
      }

      else {
        gamePlayer = this.owner.getGamePlayerByName(toggleTokenPacket.player.name);
      }

      gamePlayer.toggleToken(toggleTokenPacket.role);
      this.owner.lobby.broadcast(new UpdateTokensPacket(gamePlayer.serialize()));
    }
  }

  end() {
  }
}

export = DayState;
