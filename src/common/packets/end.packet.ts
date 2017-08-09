import Packet from './packet';
import EndData from "../end-data";
import Team from '../team';

class EndPacket extends Packet {
  constructor(public players: EndData[], public winner: Team) {
    super('end');
  }
}

export default EndPacket;
