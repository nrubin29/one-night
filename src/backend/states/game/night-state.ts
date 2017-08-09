import async = require('async');
import Player = require('../../player');
import DayState = require('./day-state');
import Game = require('../../game');
import {State} from '../../state-machine';
import ActionStartPacket from '../../../common/packets/action-start.packet';
import StringPacket from '../../../common/packets/string.packet';
import Packet from '../../../common/packets/packet';

class NightState extends State<Game> {
  start() {
    this.owner.lobby.broadcast(new StringPacket('ready'));

    async.eachSeries(this.owner.lobby.deck.roles.filter(role => role.hasNightAction), (role, done) => {
      const packet = new ActionStartPacket(role, this.owner.players.map(p => p.json), this.owner.centerCards);

      this.owner.players.filter(p => p.card.name === role.name).forEach(p => {
        p.player.emit(packet);
      });

      setTimeout(() => {
        this.owner.players.forEach(p => {
          p.player.emit(new StringPacket('action-end'));
        });

        done();
      }, 5 * 1000);
    }, () => {
      this.owner.stateMachine.toState(new DayState(this.owner));
    });
  }

  handlePacket(player: Player, packet: Packet) {
    // TODO: Handle the player responses.
  }

  end() {
  }
}

export = NightState;
