class Player {
  constructor(public socket: SocketIO.Socket, public name: string) {
  }

  emit(data: any) {
    this.socket.emit('event', data);
  }
}

export = Player;
