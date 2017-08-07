import {State} from '../../state-machine';
import Player = require('../../player');
import Game = require('../../game');
import EndState = require('./end-state');
import GamePlayer = require('../../game-player');

class VotingState extends State<Game> {
  start() {
    setTimeout(() => {
      // TODO: Calculate end data.
      const data = {
        players: []
      };

      const playerVotes: { player: GamePlayer, votes: number }[] = this.parent.players.map(p => ({
        player: p,
        votes: 0
      }));

      this.parent.players.forEach(p => {
        this.parent.players.forEach(o => {
          if (o.vote && o.vote === p) {
            playerVotes.find(pV => pV.player === p).votes++;
          }
        });
      });

      const maxVotes = Math.max(...playerVotes.map(pV => pV.votes));
      const killedPlayers = playerVotes.filter(pV => pV.votes === maxVotes);

      // TODO: Calculate winner.

      this.parent.players.forEach(p => {
        data.players.push({
          name: p.player.name,
          role: p.card,
          originalRole: p.originalCard,
          killed: killedPlayers.findIndex(pV => pV.player === p) !== -1,
          votedBy: this.parent.players.filter(other => other !== p && other.vote === p)
        });
      });

      this.parent.lobby.broadcast({
        event: 'end',
        data: data
      });

      this.parent.stateMachine.toState(new EndState(this.parent));
    }, 10 * 1000);
  }

  handleEvent(player: Player, data: any) {
    if (data.event === 'vote') {
      this.parent.players.find(p => p.player === player).vote = data.player ? this.parent.players.find(p => p.player.name === data.player) : null;
    }
  }

  end() {
  }
}

export = VotingState;
