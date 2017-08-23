import {State} from '../../state-machine';
import Packet from '../../../common/packets/packet';
import EndPacket from "../../../common/packets/end.packet";
import Team from '../../../common/team';
import CardHolder from '../../../common/card-holder';
import {LobbyState} from '../lobby/lobby-state';
import Player = require('../../player');
import Game = require('../../game');

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

    const players: { player: CardHolder, killed: boolean, votedBy: CardHolder[] }[] = [];

    this.owner.players.forEach(p => {
      players.push({
        player: p.serialize(),
        killed: maxVotes > 0 && killedPlayers.findIndex(pV => pV.player === p) !== -1,
        votedBy: this.owner.players.filter(other => other.vote === p).map(other => other.serialize())
      });
    });

    let winner: Team;

    for (let player of players) {
      if (player.killed && player.player.card.name === 'Werewolf') {
        winner = 'Villager';
        break;
      }
    }

    if (!winner) {
      let onlyVillagers = true;

      for (let player of players) {
        if (!player.killed && player.player.card.team === 'Werewolf') {
          onlyVillagers = false;
          break;
        }
      }

      winner = onlyVillagers ? 'Villager' : 'Werewolf';
    }

    this.owner.lobby.broadcast(new EndPacket(players, winner));
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
