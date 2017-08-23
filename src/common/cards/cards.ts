import Werewolf from './werewolf';
import Minion from './minion';
import Mason from './mason';
import Seer from './seer';
import ApprenticeSeer from './apprentice-seer';
import Villager from './villager';
import Robber from './robber';
import Troublemaker from './troublemaker';
import Insomniac from './insomniac';
import Card from '../card';

class Cards {
  static getAllRoles(): Card[] {
    return [
      Werewolf,
      Minion,
      Mason,
      Seer,
      ApprenticeSeer,
      Robber,
      Troublemaker,
      Villager,
      Insomniac
    ];
  }

  static getAllCards(): Card[] {
    return [
      Werewolf,
      Werewolf,
      Minion,
      Mason,
      Mason,
      Seer,
      ApprenticeSeer,
      Robber,
      Troublemaker,
      Villager,
      Villager,
      Villager,
      Insomniac
    ];
  }
}

export default Cards;
