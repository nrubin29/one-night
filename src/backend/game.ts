import {StateMachine} from './state-machine';
import Card from '../common/card';
import Lobby = require('./lobby');
import GameDeck = require('./game-deck');
import Deck = require('./deck');
import GamePlayer = require('./game-player');
import CardState = require('./states/game/card-state');

class Game {
  stateMachine: StateMachine<Game>;
  players: GamePlayer[];
  deck: GameDeck;
  centerCards: Card[];

  constructor(public lobby: Lobby, deck: Deck) {
    this.stateMachine = new StateMachine<Game>();
    this.players = this.lobby.players.map(p => new GamePlayer(p));
    this.deck = new GameDeck(deck);
    this.centerCards = [];
  }

  start() {
    this.players.forEach(p => {
      p.card = this.deck.dealCard();
      p.player.emit({
        event: 'card',
        card: p.card
      });
    });

    this.centerCards = [this.deck.dealCard(), this.deck.dealCard(), this.deck.dealCard()];
    this.stateMachine.toState(new CardState(this));
  }
}

export = Game;
