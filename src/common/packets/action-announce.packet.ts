import Packet from './packet';
import Card from '../card';

class ActionAnnouncePacket extends Packet {
  constructor(public role: Card) {
    super('action-announce');
  }
}

export default ActionAnnouncePacket;
