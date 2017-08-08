import Packet from './packet';
import CardHolder from "../card-holder";

class UpdateTokensPacket extends Packet {
  constructor(public player: CardHolder) {
    super('update-tokens');
  }
}

export default UpdateTokensPacket;
