import Packet from './packet';
import CardHolder from "../card-holder";

class VotePacket extends Packet {
  constructor(public players: CardHolder[]) {
    super('vote');
  }
}

export default VotePacket;
