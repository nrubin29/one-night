import {State} from "../state-machine";
import Player = require("../player");

class DayState extends State {
  start() {

  }

  handleEvent(player: Player, data: any) {
    // TODO: Handle token placements/removals.
  }

  end() {
  }
}

export = DayState;