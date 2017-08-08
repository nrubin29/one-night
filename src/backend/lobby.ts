import {StateMachine} from './state-machine';
import Deck = require('./deck');
import Player = require('./player');
import LobbyState = require('./states/lobby/lobby-state');
import Cards = require('../common/cards/cards');

class Lobby {
  id: number;
  private server: SocketIO.Server;
  stateMachine: StateMachine<Lobby>;

  players: Player[];
  deck: Deck;

  constructor(id: number, server: SocketIO.Server) {
    this.id = id;
    this.server = server;
    this.stateMachine = new StateMachine<Lobby>();

    this.players = [];
    this.deck = new Deck(Cards.getAllCards());

    this.stateMachine.toState(new LobbyState(this));
  }

  broadcast(data: any) {
    this.server.sockets.in(`${this.id}`).emit('event', data);
  }

  addPlayer(player: Player) {
    this.players.push(player);
    player.socket.emit('roles', this.deck.roles);

    player.socket.on('disconnect', () => {
      // TODO: Use something better than filter here...maybe
      this.players = this.players.filter(p => p !== player);
    });

    player.socket.on('event', data => {
      console.log(`Player event ${JSON.stringify(data)}`);
      this.stateMachine.handleEvent(player, data);
    });

    this.broadcast({
      event: 'join',
      players: this.players.map(p => p.name)
    });
  }
}

export = Lobby;
