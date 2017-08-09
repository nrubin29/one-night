import {StateMachine} from './state-machine';
import CardHolder from '../common/card-holder';
import Lobby = require('./lobby');
import GameDeck = require('./game-deck');
import GamePlayer = require('./game-player');
import CardState = require('./states/game/card-state');
import Player = require('./player');

class Game {
  stateMachine: StateMachine<Game>;
  players: GamePlayer[];
  deck: GameDeck;
  centerCards: CardHolder[];

  constructor(public lobby: Lobby) {
    this.stateMachine = new StateMachine<Game>();
    this.players = this.lobby.players.map(p => new GamePlayer(p));
    this.deck = new GameDeck(lobby.deck);
  }

  start() {
    this.stateMachine.toState(new CardState(this));
  }

  getGamePlayer(player: Player) {
    return this.players.find(gP => gP.player === player);
  }

  getGamePlayerByName(name: string) {
    return this.players.find(gP => gP.name === name);
  }
}

export = Game;
