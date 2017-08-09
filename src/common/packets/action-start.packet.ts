import Packet from './packet';
import Card from '../card';
import CardHolder from "../card-holder";

class ActionStartPacket extends Packet {
  constructor(public role: Card, public players: CardHolder[], public centerCards: CardHolder[], public time: number) {
    super('action-start');
  }
}

export default ActionStartPacket;
