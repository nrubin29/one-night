import Packet from './packet';

class JoinPacket extends Packet {
  constructor(public lobbyId: number, public players: string[], public target: number, public owner: string) {
    super('join');
  }
}

export default JoinPacket;
