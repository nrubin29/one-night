import Packet from './packet';
import EndData from "../end-data";

class EndPacket extends Packet {
  constructor(public players: EndData[]) {
    super('end');
  }
}

export default EndPacket;
