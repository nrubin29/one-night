import Packet from '../common/packets/packet';

class Player {
  constructor(public socket: SocketIO.Socket, public name: string) {
  }

  emit(packet: Packet) {
    this.socket.emit('packet', packet);
  }
}

export = Player;
