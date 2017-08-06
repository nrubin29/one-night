import Player = require("./player");
import {StateMachine} from "./state-machine";
import LobbyState = require("./states/lobby-state");

class Game {
  id: number;
  private server: SocketIO.Server;

  stateMachine: StateMachine;
  players: Player[];

  constructor(id: number, server: SocketIO.Server) {
    this.id = id;
    this.server = server;

    this.stateMachine = new StateMachine();
    this.players = [];

    this.stateMachine.toState(new LobbyState(this));
  }

  broadcast(data: any) {
    this.server.sockets.in(`${this.id}`).emit('event', data);
  }

  addPlayer(player: Player) {
    this.players.push(player);

    player.socket.on('disconnect', () => {
      // TODO: Use something better than filter here.
      this.players = this.players.filter(p => p !== player);
    });

    player.socket.on('event', data => {
      this.stateMachine.handleEvent(data);
    });

    this.broadcast({
      event: 'join',
      players: this.players.map(player => player.name)
    });
  }
}

export = Game;