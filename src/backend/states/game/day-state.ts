import {State} from '../../state-machine';
import Player = require('../../player');
import Game = require('../../game');
import VotingState = require('./voting-state');

class DayState extends State<Game> {
  start() {
    setTimeout(() => {
      this.parent.lobby.broadcast({
        event: 'vote',
        players: this.parent.players.map(p => ({name: p.player.name, tokens: p.tokens}))
      });

      this.parent.stateMachine.toState(new VotingState(this.parent));
    }, 10 * 1000);
  }

  handleEvent(player: Player, data: any) {
    if (data.event === 'toggle-token') {
      const gamePlayer = this.parent.players.find(p => p.player.name === data.player);
      if (gamePlayer.hasToken(data.role)) {
        this.parent.lobby.broadcast({
          event: 'remove-token',
          player: data.player,
          role: data.role
        });
      }

      else {
        this.parent.lobby.broadcast({
          event: 'add-token',
          player: data.player,
          role: data.role
        });
      }

      gamePlayer.toggleToken(data.role);
    }
  }

  end() {
  }
}

export = DayState;
