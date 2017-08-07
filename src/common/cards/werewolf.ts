import Card from "../card";

class Werewolf extends Card {
  constructor() {
    super('Werewolf', 'Werewolves');
  }

  getNightAction(playerCards: Card[], centerCards: Card[]): any {
    let numWerewolves = playerCards.reduce((pv, cv) => pv + (cv.name === 'Werewolf' ? 1 : 0), 0);

    if (numWerewolves > 1) {
      return {
        actionType: 'View Players',
        ofType: 'Werewolf'
      }
    }

    else {
      return {
        actionType: 'View Cards',
        ofType: 'Center',
        count: 1
      }
    }
  }
}

export default new Werewolf();