import { State } from '../../state-machine';
import Packet from '../../../common/packets/packet';
import VoteForPacket from '../../../common/packets/vote-for.packet';
import VotePacket from '../../../common/packets/vote.packet';
import Player = require('../../player');
import Game = require('../../game');
import EndState = require('./end-state');

class VotingState extends State<Game> {
  start() {
    this.owner.lobby.broadcast(new VotePacket(this.owner.players.map(p => p.cardHolder)));

    setTimeout(() => {
      this.owner.stateMachine.toState(new EndState(this.owner));
    }, 10 * 1000);
  }

  handlePacket(player: Player, packet: Packet) {
    if (packet.name === 'vote-for') {
      const voteForPacket = packet as VoteForPacket;
      const gamePlayer = this.owner.getGamePlayer(player);
      gamePlayer.vote = voteForPacket.player ? this.owner.getGamePlayerByName(voteForPacket.player.name) : null;
    }
  }

  end() {
  }
}

export = VotingState;
