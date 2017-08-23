import Player = require('./player');
import Packet from '../common/packets/packet';

export abstract class State<T> {
  constructor(public owner: T) {
  }

  abstract start();
  abstract handlePacket(player: Player, packet: Packet);
  abstract end();
}

export class StateMachine<T> {
  state: State<T>;

  public handlePacket(player: Player, packet: Packet) {
    if (this.state) {
      this.state.handlePacket(player, packet);
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
