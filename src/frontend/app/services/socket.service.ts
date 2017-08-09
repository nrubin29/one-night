import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import Card from '../../../common/card';
import Packet from '../../../common/packets/packet';
import RolesPacket from '../../../common/packets/roles.packet';
import JoinLobbyPacket from '../../../common/packets/join-game.packet';

@Injectable()
export class SocketService {
  private socket: SocketIOClient.Socket;
  stream: Observable<Packet>;

  name: string;
  allRoles: Card[];
  lastPacket: Packet; // Used to store a packet between states.

  constructor(private router: Router) {
  }

  connect(gameID: number): Promise<void> {
    this.name = name;

    return new Promise<void>((resolve, reject) => {
      this.socket = io('http://localhost:4000');
      this.socket.on('disconnect', () => {
        this.router.navigate(['/home']);
      });
      this.socket.on('connect', () => {
        this.stream = new Observable<Packet>(observer => {
          this.socket.on('packet', packet => observer.next(packet as Packet));
          // return () => {
          //     this.socket.off('event');
          // }
        });

        this.stream.subscribe(packet => {
          if (packet.name === 'roles') {
            const rolesPacket = packet as RolesPacket;
            this.allRoles = rolesPacket.roles;
          }
        });

        this.emit(new JoinLobbyPacket(gameID));

        resolve();
      });
    });
  }

  isConnected(): boolean {
    return this.socket && this.socket.connected;
  }

  emit(packet: Packet) {
    if (!this.isConnected()) {
      throw new Error('Socket is not connected!');
    }

    console.log(`Emitting packet ${JSON.stringify(packet)}`);
    this.socket.emit('packet', packet);
  }
}
