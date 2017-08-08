import Packet from './packet';
import CardHolder from '../card-holder';

class CardHolderPacket extends Packet {
  constructor(public cardHolder: CardHolder) {
    super('card-holder');
  }
}

export default CardHolderPacket;
