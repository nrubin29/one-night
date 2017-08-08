import Packet from './packet';
import Card from '../card';
import CardHolder from "../card-holder";

class ToggleTokenPacket extends Packet {
  constructor(public player: CardHolder, public role: Card) {
    super('toggle-token');
  }
}

export default ToggleTokenPacket;
