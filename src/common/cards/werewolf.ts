import Card from '../card';

class Werewolf extends Card {
  constructor() {
    super('Werewolf', 'Werewolf', 'Wake, and look for the other werewolves. You win if no werewolves are killed.', true);
  }
}

export default new Werewolf();
