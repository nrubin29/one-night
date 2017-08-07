import {State} from '../../state-machine';
import Player = require('../../player');
import Lobby = require('../../lobby');
import GameState = require('./game-state');

class LobbyState extends State<Lobby> {
  start() {

  }

  handleEvent(player: Player, data: any) {
    if (data.event === 'start') {
      this.parent.broadcast({
        event: 'start'
      });

      this.parent.stateMachine.toState(new GameState(this.parent));
    }
  }

  end() {
  }
}

export = LobbyState;
