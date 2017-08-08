import Packet from './packet';
import CardHolder from "../card-holder";

class DayPacket extends Packet {
  constructor(public players: CardHolder[]) {
    super('day');
  }
}

export default DayPacket;
