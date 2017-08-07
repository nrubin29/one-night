import {State} from "../state-machine";
import Player = require("../player");
import NightState = require("./night-state");

class CardState extends State {
  private ready: number;

  start() {
    this.ready = 0;
  }

  handleEvent(player: Player, data: any) {
    if (data.event === 'ready') {
      this.ready++;

      if (this.ready === this.game.players.length) {
        this.game.broadcast({
          event: 'ready'
        });

        this.game.stateMachine.toState(new NightState(this.game));
      }
    }
  }

  end() {
  }
}

export = CardState;