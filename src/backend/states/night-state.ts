import async = require('async');
import Player = require("../player");
import DayState = require("./day-state");
import {State} from "../state-machine";

class NightState extends State {
  start() {
    async.each(Array.from(this.game.deck.roles), (role, done) => {
      const nightAction = role.getNightAction(this.game.players.map(p => p.card), this.game.centerCards);

      if (nightAction) {
        let data;

        if (nightAction.actionType === 'View Players') {
          data = {
            event: 'view-players',
            players: this.game.players.filter(p => p.card.name === nightAction.ofType).map(p => p.name)
          }
        }

        else if (nightAction.actionType === 'View Cards') {
          let cards;

          if (nightAction.ofType === 'Center') {
            cards = this.game.centerCards;
          }

          else if (nightAction.ofType === 'Player') {
            cards = this.game.players.map(p => p.card);
          }

          data = {
            event: 'view-cards',
            cards: cards,
            count: nightAction.count
          }
        }

        this.game.players.filter(p => p.card.name === role.name).forEach(p => {
          p.emit(data);
        });

        setTimeout(() => {
          this.game.players.forEach(p => {
            p.emit({
              event: 'action-end'
            });
          });

          done();
        }, 5 * 1000);

        // TODO: Emit action end after pause.
      }

      else {
        done();
      }
    }, () => {
      this.game.broadcast({
        event: 'day'
      });

      this.game.stateMachine.toState(new DayState(this.game));
    });
  }

  handleEvent(player: Player, data: any) {
    // TODO: Handle the player responses.
  }

  end() {
  }
}

export = NightState;