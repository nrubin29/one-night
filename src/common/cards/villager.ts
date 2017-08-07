import Card from "../card";

class Villager extends Card {
  constructor() {
    super('Villager', 'Villagers');
  }

  getNightAction(playerCards: Card[], centerCards: Card[]) {
    return null;
  }
}

export default new Villager();