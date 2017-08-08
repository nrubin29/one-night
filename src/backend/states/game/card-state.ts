import { State } from '../../state-machine';
import Packet from "../../../common/packets/packet";
import Player = require('../../player');
import NightState = require('./night-state');
import Game = require('../../game');

class CardState extends State<Game> {
  private ready: Player[];

  start() {
    this.ready = [];
  }

  // TODO: Ready needs to be an array of players so that one person can't click the button a bunch of times.
  handlePacket(player: Player, packet: Packet) {
    if (packet.name === 'ready') {
      if (this.ready.indexOf(player) === -1) {
        this.ready.push(player);
      }

      if (this.ready.length >= this.owner.lobby.players.length) {
        this.owner.stateMachine.toState(new NightState(this.owner));
      }
    }
  }

  end() {
  }
}

export = CardState;
