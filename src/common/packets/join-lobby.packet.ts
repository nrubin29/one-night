import Packet from './packet';

class JoinLobbyPacket extends Packet {
  constructor(public id: number) {
    super('join-lobby');
  }
}

export default JoinLobbyPacket;
