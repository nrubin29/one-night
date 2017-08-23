import Team from './team';

abstract class Card {
  constructor(public name: string, public team: Team, public description: string, public hasNightAction: boolean = false) {
  }
}

export default Card;
