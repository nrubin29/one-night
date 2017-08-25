import {StateMachine} from './state-machine';
import Packet from '../common/packets/packet';
import JoinPacket from '../common/packets/join.packet';
import RolesPacket from '../common/packets/roles.packet';
import GameSettings from '../common/game-settings';
import {LobbyState} from './states/lobby/lobby-state';
import JoinLobbyPacket from '../common/packets/join-lobby.packet';
import Deck = require('./deck');
import Player = require('./player');
import Client = require('./client');

class Lobby {
  stateMachine: StateMachine<Lobby>;

  clients: Client[];
  players: Player[];
  deck: Deck;

  constructor(public id: number, private _gameSettings: GameSettings, private server: SocketIO.Server) {
    this.players = [];
    this.clients = [];
    this.deck = new Deck(_gameSettings.cards);

    this.stateMachine = new StateMachine<Lobby>();
    this.stateMachine.toState(new LobbyState(this));
  }

  broadcast(packet: Packet) {
    this.server.sockets.in(`${this.id}`).emit('packet', packet);
  }

  addPlayer(player: Player) {
    this.players.push(player);

    if (this.players.length === 1) {
      player.owner = true;
    }

    player.socket.on('disconnect', () => {
      this.players = this.players.filter(p => p !== player);
    });

    player.socket.on('packet', packet => {
      console.log(`Player packet ${JSON.stringify(packet)}`);
      this.stateMachine.handlePacket(player, packet);
    });

    player.emit(new RolesPacket(this.deck.roles));
    this.broadcast(new JoinPacket(this.id, this.players.map(p => p.name), this.deck.cards.length - 3, this.players.find(p => p.owner).name));
  }

  addClient(client: Client) {
    this.clients.push(client);

    client.socket.on('disconnect', () => {
      this.clients = this.clients.filter(c => c !== client);
    });

    client.emit(new JoinLobbyPacket(this.id));
  }

  get gameSettings(): GameSettings {
    return this._gameSettings;
  }

  set gameSettings(newVal: GameSettings) {
    this._gameSettings = newVal;
    this.deck = new Deck(this._gameSettings.cards);
  }
}

export = Lobby;
