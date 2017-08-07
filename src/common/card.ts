import Team from "./team";

abstract class Card {
  constructor(public name: string, public team: Team) {
  }

  abstract getNightAction(playerCards: Card[], centerCards: Card[]): any;
}

export default Card;