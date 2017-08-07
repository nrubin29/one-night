import Card from "../common/card";

class Player {
  card: Card;

  constructor(public socket: SocketIO.Socket, public name: string) {
  }

  emit(data: any) {
    this.socket.emit('event', data);
  }
}

export = Player;