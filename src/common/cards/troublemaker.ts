import Card from '../card';

class Troublemaker extends Card {
  constructor() {
    super('Troublemaker', 'Villager', 'Exchange cards between any two other players.', true);
  }
}

export default new Troublemaker();
