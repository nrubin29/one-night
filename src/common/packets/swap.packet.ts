import Packet from './packet';
import CardHolder from "../card-holder";

class SwapPacket extends Packet {
  // null means the emitter of the packet.
  constructor(public p1: CardHolder | null, public p2: CardHolder | null) {
    super('swap');
  }
}

export default SwapPacket;
