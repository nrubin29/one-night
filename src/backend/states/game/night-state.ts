import async = require('async');
import Player = require('../../player');
import DayState = require('./day-state');
import Game = require('../../game');
import { State } from '../../state-machine';
import ActionStartPacket from '../../../common/packets/action-start.packet';
import StringPacket from '../../../common/packets/string.packet';
import Packet from '../../../common/packets/packet';
import SwapPacket from '../../../common/packets/swap.packet';

class NightState extends State<Game> {
  start() {
    this.owner.lobby.broadcast(new StringPacket('ready'));

    async.eachSeries(this.owner.lobby.deck.roles.filter(role => role.hasNightAction), (role, done) => {
      const packet = new ActionStartPacket(role, this.owner.players.map(p => p.json), this.owner.centerCards, this.owner.lobby.gameSettings.roleTimer);

      this.owner.players.filter(p => p.originalCard.name === role.name).forEach(p => {
        p.player.emit(packet);
      });

      setTimeout(() => {
        this.owner.players.forEach(p => {
          p.player.emit(new StringPacket('action-end'));
        });

        done();
      }, this.owner.lobby.gameSettings.roleTimer * 1000);
    }, () => {
      this.owner.stateMachine.toState(new DayState(this.owner));
    });
  }

  handlePacket(player: Player, packet: Packet) {
    if (packet.name === 'swap') {
      const swapPacket = (packet as SwapPacket);
      const p1 = swapPacket.p1 ? this.owner.getGamePlayerByName(swapPacket.p1.name) : this.owner.getGamePlayer(player);
      const p2 = swapPacket.p2 ? this.owner.getGamePlayerByName(swapPacket.p2.name) : this.owner.getGamePlayer(player);

      const tempCard = p1.card;
      p1.card = p2.card;
      p2.card = tempCard;
    }
  }

  end() {
  }
}

export = NightState;
