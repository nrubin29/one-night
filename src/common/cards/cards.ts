import Werewolf from './werewolf';
import Villager from './villager';
import Card from '../card';

class Cards {
  static getAllRoles(): Card[] {
    return [
      Werewolf,
      Villager
    ];
  }

  static getAllCards(): Card[] {
    return [
      Werewolf,
      Villager,
      Werewolf,
      Villager,
      Villager
    ];
  }
}

export = Cards;
