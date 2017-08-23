import Card from '../card';

class Seer extends Card {
  constructor() {
    super('Seer', 'Villager', 'View either two of the center cards, or one card from any other player.', true);
  }
}

export default new Seer();
