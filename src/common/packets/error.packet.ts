import Packet from './packet';

class ErrorPacket extends Packet {
  constructor(public message: string) {
    super('error');
  }
}

export default ErrorPacket;
