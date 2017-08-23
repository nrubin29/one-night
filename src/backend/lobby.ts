import {StateMachine} from './state-machine';
import Packet from '../common/packets/packet';
import JoinPacket from '../common/packets/join.packet';
import RolesPacket from '../common/packets/roles.packet';
import GameSettings from '../common/game-settings';
import {LobbyState} from './states/lobby/lobby-state';
import Deck = require('./deck');
import Player = require('./player');

class Lobby {
  stateMachine: StateMachine<Lobby>;

  players: Player[];
  deck: Deck;

  constructor(public id: number, public gameSettings: GameSettings, private server: SocketIO.Server) {
    this.players = [];
    this.deck = new Deck(gameSettings.cards);

    this.stateMachine = new StateMachine<Lobby>();
    this.stateMachine.toState(new LobbyState(this));
  }

  broadcast(packet: Packet) {
    this.server.sockets.in(`${this.id}`).emit('packet', packet);
  }

  addPlayer(player: Player) {
    this.players.push(player);

    player.socket.on('disconnect', () => {
      this.players = this.players.filter(p => p !== player);
    });

    player.socket.on('packet', packet => {
      console.log(`Player packet ${JSON.stringify(packet)}`);
      this.stateMachine.handlePacket(player, packet);
    });

    player.emit(new RolesPacket(this.deck.roles));
    this.broadcast(new JoinPacket(this.id, this.players.map(p => p.name), this.deck.cards.length - 3));
  }
}

export = Lobby;
