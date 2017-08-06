import Card from "../common/card";

class Player {
  socket: SocketIO.Socket;
  name: string;
  card: Card;

  constructor(socket: SocketIO.Socket, name: string) {
    this.socket = socket;
    this.name = name;
  }
}

export = Player;