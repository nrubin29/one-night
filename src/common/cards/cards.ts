import Werewolf from './werewolf';
import Minion from './minion';
import Mason from './mason';
import ApprenticeSeer from './apprentice-seer';
import Villager from './villager';
import Card from '../card';

class Cards {
  static getAllRoles(): Card[] {
    return [
      Werewolf,
      Minion,
      Mason,
      ApprenticeSeer,
      Villager
    ];
  }

  static getAllCards(): Card[] {
    return [
      Werewolf,
      Werewolf,
      Minion,
      Mason,
      Mason,
      ApprenticeSeer,
      Villager,
      Villager,
      Villager
    ];
  }
}

export default Cards;
