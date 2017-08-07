import {State} from "../state-machine";
import Player = require("../player");
import CardState = require("./card-state");

class LobbyState extends State {
  start() {

  }

  handleEvent(player: Player, data: any) {
    if (data.event === 'start') {
      this.game.broadcast({
        event: 'start'
      });

      this.game.players.forEach(player => {
        player.card = this.game.deck.dealCard();
        player.emit({
          event: 'card',
          card: player.card
        });
      });

      this.game.centerCards = [this.game.deck.dealCard(), this.game.deck.dealCard(), this.game.deck.dealCard()];
      this.game.stateMachine.toState(new CardState(this.game));
    }
  }

  end() {
  }
}

export = LobbyState;