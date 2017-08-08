import { StateMachine } from './state-machine';
import CardHolder from '../common/card-holder';
import CardHolderPacket from '../common/packets/card-holder.packet';
import Lobby = require('./lobby');
import GameDeck = require('./game-deck');
import Deck = require('./deck');
import GamePlayer = require('./game-player');
import CardState = require('./states/game/card-state');
import Player = require('./player');

class Game {
  stateMachine: StateMachine<Game>;
  players: GamePlayer[];
  deck: GameDeck;
  centerCards: CardHolder[];

  constructor(public lobby: Lobby, deck: Deck) {
    this.stateMachine = new StateMachine<Game>();
    this.players = this.lobby.players.map(p => new GamePlayer(p));
    this.deck = new GameDeck(deck);
    this.centerCards = [];
  }

  start() {
    this.players.forEach(p => {
      p.cardHolder.card = this.deck.dealCard();
      p.cardHolder.originalCard = p.cardHolder.card;
      p.player.emit(new CardHolderPacket(p.cardHolder));
    });

    this.centerCards = [
      new CardHolder('Center 1', this.deck.dealCard()),
      new CardHolder('Center 2', this.deck.dealCard()),
      new CardHolder('Center 3', this.deck.dealCard())
    ];

    this.stateMachine.toState(new CardState(this));
  }

  getGamePlayer(player: Player) {
    return this.players.find(gP => gP.player === player);
  }

  getGamePlayerByName(name: string) {
    return this.players.find(gP => gP.cardHolder.name === name);
  }
}

export = Game;
