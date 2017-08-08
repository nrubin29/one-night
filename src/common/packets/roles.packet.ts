import Packet from './packet';
import Card from '../card';

class RolesPacket extends Packet {
  constructor(public roles: Card[]) {
    super('roles');
  }
}

export default RolesPacket;
