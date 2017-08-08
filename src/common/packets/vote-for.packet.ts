import Packet from './packet';
import CardHolder from "../card-holder";

class VoteForPacket extends Packet {
  constructor(public player: CardHolder) {
    super('vote-for');
  }
}

export default VoteForPacket;
