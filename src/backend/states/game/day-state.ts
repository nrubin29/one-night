import {State} from '../../state-machine';
import Player = require('../../player');
import Game = require('../../game');

class DayState extends State<Game> {
  start() {

  }

  handleEvent(player: Player, data: any) {
    // TODO: Handle token placements/removals.
  }

  end() {
  }
}

export = DayState;
