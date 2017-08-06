import {State} from "../state-machine";
import Deck = require("../deck");
import cards from '../../common/cards/cards';

class LobbyState extends State {
  private deck: Deck;

  start() {
    this.deck = new Deck(cards);
  }

  handleEvent(data: any) {
    if (data.event === 'start') {
      this.game.broadcast({
        event: 'start'
      });

      this.game.players.forEach(player => {
        player.card = this.deck.dealCard();
        player.socket.emit('event', {
          event: 'card',
          card: player.card
        });
      });
    }
  }

  end() {
  }
}

export = LobbyState;