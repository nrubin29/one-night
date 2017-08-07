import {State} from '../../state-machine';
import Player = require('../../player');
import NightState = require('./night-state');
import Game = require('../../game');

class CardState extends State<Game> {
  private ready: number;

  start() {
    this.ready = 0;
  }

  handleEvent(player: Player, data: any) {
    if (data.event === 'ready') {
      if (++this.ready === this.parent.lobby.players.length) {
        this.parent.lobby.broadcast({
          event: 'ready'
        });

        this.parent.stateMachine.toState(new NightState(this.parent));
      }
    }
  }

  end() {
  }
}

export = CardState;
