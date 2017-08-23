import Card from '../card';

class Robber extends Card {
  constructor() {
    super('Robber', 'Villager', 'Exchange your card with another player\'s card and view your new card.', true);
  }
}

export default new Robber();
