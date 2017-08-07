import Player = require('./player');

export abstract class State<T> {
  constructor(public parent: T) {
  }

  abstract start();

  abstract handleEvent(player: Player, data: any);
  abstract end();
}

export class StateMachine<T> {
  state: State<T>;

  public handleEvent(player: Player, data: any) {
    if (this.state) {
      this.state.handleEvent(player, data);
    }
  }

  public toState(state: State<T>) {
    if (this.state) {
      this.state.end();
    }

    this.state = state;
    this.state.start();
  }
}
