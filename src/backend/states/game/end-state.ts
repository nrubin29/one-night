import { State } from '../../state-machine';
import Packet from '../../../common/packets/packet';
import EndPacket from "../../../common/packets/end.packet";
import Player = require('../../player');
import Game = require('../../game');
import LobbyState = require('../lobby/lobby-state');

class EndState extends State<Game> {
  start() {
    const playerVotes = this.owner.players.map(p => ({
      player: p,
      votes: 0
    }));

    this.owner.players.forEach(p => {
      this.owner.players.forEach(o => {
        if (o.vote && o.vote === p) {
          playerVotes.find(pV => pV.player === p).votes++;
        }
      });
    });

    const maxVotes = Math.max(...playerVotes.map(pV => pV.votes));
    const killedPlayers = playerVotes.filter(pV => pV.votes === maxVotes);

    // TODO: Calculate winning team.

    const players = [];

    this.owner.players.forEach(p => {
      players.push({
        player: p.cardHolder,
        killed: killedPlayers.findIndex(pV => pV.player === p) !== -1,
        votedBy: this.owner.players.filter(other => other !== p && other.vote === p).map(other => other.cardHolder)
      });
    });

    this.owner.lobby.broadcast(new EndPacket(players));
  }

  handlePacket(player: Player, packet: Packet) {
    if (packet.name === 'lobby') {
      this.owner.lobby.stateMachine.toState(new LobbyState(this.owner.lobby));
    }
  }

  end() {
  }
}

export = EndState;
