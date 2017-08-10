import Card from './card';

class GameSettings {
  constructor(public cards: Card[] = [], public roleTimer: number = 5, public dayTimer: number = 60, public voteTimer: number = 10) {
  }
}

export default GameSettings;
