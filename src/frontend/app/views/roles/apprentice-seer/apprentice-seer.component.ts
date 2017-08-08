import { Component, OnInit } from '@angular/core';
import ActionStartPacket from '../../../../../common/packets/action-start.packet';
import { Router } from '@angular/router';
import { SocketService } from '../../../services/socket.service';
import CardHolder from '../../../../../common/card-holder';

@Component({
  selector: 'app-apprentice-seer',
  templateUrl: './apprentice-seer.component.html',
  styleUrls: ['./apprentice-seer.component.scss']
})
export class ApprenticeSeerComponent implements OnInit {
  centerCards: CardHolder[];

  constructor(private socketService: SocketService, private router: Router) {
  }

  ngOnInit() {
    const actionStartPacket = this.socketService.lastPacket as ActionStartPacket;
    this.centerCards = actionStartPacket.centerCards as CardHolder[];

    this.socketService.stream.subscribe(packet => {
      if (packet.name === 'action-end') {
        this.router.navigate(['/night']);
      }
    });
  }
}
