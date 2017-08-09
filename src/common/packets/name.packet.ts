import Packet from './packet';

class NamePacket extends Packet {
  constructor(public playerName: string) {
    super('name');
  }
}

export default NamePacket;
