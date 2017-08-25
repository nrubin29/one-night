import Client = require('./client');

class Player extends Client {
  constructor(public socket: SocketIO.Socket, public name: string, public owner = false) {
    super(socket);
  }
}

export = Player;
