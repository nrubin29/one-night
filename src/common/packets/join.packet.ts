import Packet from './packet';

class JoinPacket extends Packet {
  constructor(public players: string[]) {
    super('join');
  }
}

export default JoinPacket;
