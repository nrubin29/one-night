import { StateMachine } from './state-machine';
import Packet from '../common/packets/packet';
import JoinPacket from '../common/packets/join.packet';
import RolesPacket from '../common/packets/roles.packet';
import Card from '../common/card';
import Deck = require('./deck');
import Player = require('./player');
import LobbyState = require('./states/lobby/lobby-state');

class Lobby {
  id: number;
  private server: SocketIO.Server;
  stateMachine: StateMachine<Lobby>;

  players: Player[];
  deck: Deck;

  constructor(id: number, cards: Card[], server: SocketIO.Server) {
    this.id = id;
    this.server = server;
    this.stateMachine = new StateMachine<Lobby>();

    this.players = [];
    this.deck = new Deck(cards);

    this.stateMachine.toState(new LobbyState(this));
  }

  broadcast(packet: Packet) {
    this.server.sockets.in(`${this.id}`).emit('packet', packet);
  }

  addPlayer(player: Player) {
    this.players.push(player);

    player.socket.on('disconnect', () => {
      // TODO: Use something better than filter here...maybe
      this.players = this.players.filter(p => p !== player);
    });

    player.socket.on('packet', packet => {
      console.log(`Player packet ${JSON.stringify(packet)}`);
      this.stateMachine.handlePacket(player, packet);
    });

    player.emit(new RolesPacket(this.deck.roles));
    this.broadcast(new JoinPacket(this.players.map(p => p.name)));
  }
}

export = Lobby;
