import Packet from './packet';
import GameSettings from '../game-settings';

class GameSettingsPacket extends Packet {
  constructor(public gameSettings: GameSettings) {
    super('game-settings');
  }
}

export default GameSettingsPacket;
