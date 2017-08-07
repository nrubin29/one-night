import Game = require("./game");
import Player = require("./player");

export abstract class State {
  constructor(public game: Game) {}

  abstract start();

  abstract handleEvent(player: Player, data: any);
  abstract end();
}

export class StateMachine {
  state: State;

  public handleEvent(player: Player, data: any) {
    if (this.state) {
      this.state.handleEvent(player, data);
    }
  }

  public toState(state: State) {
    if (this.state) {
      this.state.end();
    }

    this.state = state;
    this.state.start();
  }
}