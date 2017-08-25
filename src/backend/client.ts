import Packet from '../common/packets/packet';

class Client {
  constructor(public socket: SocketIO.Socket) {
  }

  emit(packet: Packet) {
    this.socket.emit('packet', packet);
  }
}

export = Client;
