import {State} from '../../state-machine';
import Player = require('../../player');
import Game = require('../../game');
import LobbyState = require('../lobby/lobby-state');

class EndState extends State<Game> {
  start() {

  }

  handleEvent(player: Player, data: any) {
    if (data.event === 'lobby') {
      this.parent.lobby.stateMachine.toState(new LobbyState(this.parent.lobby));
    }
  }

  end() {
  }
}

export = EndState;
