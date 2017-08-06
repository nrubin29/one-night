import Game = require("./game");

export abstract class State {
  constructor(public game: Game) {}

  abstract start();
  abstract handleEvent(data: any);
  abstract end();
}

export class StateMachine {
  state: State;

  public handleEvent(data: any) {
    if (this.state) {
      this.state.handleEvent(data);
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