import Packet from './packet';

class StringPacket extends Packet {
  constructor(public str: string) {
    super(str);
  }
}

export default StringPacket;
