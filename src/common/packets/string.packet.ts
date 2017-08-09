import Packet from './packet';

class StringPacket extends Packet {
  constructor(public name: string) {
    super(name);
  }
}

export default StringPacket;
