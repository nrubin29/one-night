import Packet from './packet';

class JoinLobbyPacket extends Packet {
  constructor(public id: number, public playerName: string) {
    super('join-lobby');
  }
}

export default JoinLobbyPacket;
