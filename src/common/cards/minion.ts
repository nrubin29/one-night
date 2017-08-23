import Card from '../card';

class Minion extends Card {
  constructor() {
    super('Minion', 'Werewolf', 'You know who the werewolves are. You win if no werewolves are killed, even if you are killed.', true);
  }
}

export default new Minion();
