import { State } from '../../state-machine';
import Packet from '../../../common/packets/packet';
import CardHolderPacket from '../../../common/packets/card-holder.packet';
import CardHolder from '../../../common/card-holder';
import Player = require('../../player');
import NightState = require('./night-state');
import Game = require('../../game');

class CardState extends State<Game> {
  private ready: Player[];

  start() {
    this.ready = [];

    this.owner.players.forEach(p => {
      p.card = this.owner.deck.dealCard();
      p.originalCard = p.card;
      p.player.emit(new CardHolderPacket(p.json));
    });

    this.owner.centerCards = [
      new CardHolder('Center 1', this.owner.deck.dealCard()),
      new CardHolder('Center 2', this.owner.deck.dealCard()),
      new CardHolder('Center 3', this.owner.deck.dealCard())
    ];
  }

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
