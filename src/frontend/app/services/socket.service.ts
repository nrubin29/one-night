import {Injectable} from '@angular/core';
import * as io from 'socket.io-client';
import {Observable} from "rxjs/Observable";

@Injectable()
export class SocketService {
  private socket: SocketIOClient.Socket;
  stream: Observable<any>;

  data: any; // Used to store data to be sent between states.

  connect(gameID: number, name: string) {
    this.socket = io('http://localhost:4000');
    this.socket.emit('join', {id: gameID, name: name});

    this.stream = new Observable<any>(observer => {
        this.socket.on('event', data => observer.next(data));
        // return () => {
        //     this.socket.off('event');
        // }
    });
  }

  emit(data: any) {
    if (!this.socket.connected) {
      throw new Error('Socket is not connected!');
    }

    this.socket.emit('event', data);
  }
}
