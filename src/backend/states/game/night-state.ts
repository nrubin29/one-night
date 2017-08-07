import async = require('async');
import Player = require('../../player');
import DayState = require('./day-state');
import Game = require('../../game');
import {State} from '../../state-machine';

class NightState extends State<Game> {
  start() {
    async.each(this.parent.lobby.deck.roles.filter(role => role.hasNightAction), (role, done) => {
      const data = {
        event: 'action-start',
        role: role.name,
        players: this.parent.players.map(player => ({name: player.player.name, role: player.card.name})),
        centerCards: this.parent.centerCards
      };

      this.parent.players.filter(p => p.card.name === role.name).forEach(p => {
        p.player.emit(data);
      });

      setTimeout(() => {
        this.parent.players.forEach(p => {
          p.player.emit({
            event: 'action-end'
          });
        });

        done();
      }, 5 * 1000);
    }, () => {
      this.parent.lobby.broadcast({
        event: 'day'
      });

      this.parent.stateMachine.toState(new DayState(this.parent));
    });
  }

  handleEvent(player: Player, data: any) {
    // TODO: Handle the player responses.
  }

  end() {
  }
}

export = NightState;
