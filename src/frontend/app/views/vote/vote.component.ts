import { Component, OnInit } from '@angular/core';
import { SocketService } from '../../services/socket.service';
import { Router } from '@angular/router';
import CardHolder from '../../../../common/card-holder';
import VotePacket from '../../../../common/packets/vote.packet';
import VoteForPacket from '../../../../common/packets/vote-for.packet';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.scss']
})
export class VoteComponent implements OnInit {
  players: CardHolder[];
  selected: CardHolder;
  time: number;

  constructor(private socketService: SocketService, private router: Router) {
  }

  ngOnInit() {
    const votePacket = this.socketService.lastPacket as VotePacket;
    this.players = votePacket.players;
    this.time = votePacket.time;

    this.socketService.stream.subscribe(packet => {
      if (packet.name === 'end') {
        this.socketService.lastPacket = packet;
        this.router.navigate(['/end']);
      }
    });
  }

  tap(player: CardHolder) {
    this.selected = player;
    this.socketService.emit(new VoteForPacket(player));
  }
}
