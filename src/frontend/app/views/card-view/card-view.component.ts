import {Component, OnInit} from '@angular/core';
import {SocketService} from '../../services/socket.service';
import {Router} from '@angular/router';
import CardHolder from '../../../../common/card-holder';
import CardHolderPacket from '../../../../common/packets/card-holder.packet';
import StringPacket from '../../../../common/packets/string.packet';
import {AudioService} from '../../services/audio.service';

@Component({
  selector: 'app-card-view',
  templateUrl: './card-view.component.html',
  styleUrls: ['./card-view.component.scss']
})
export class CardViewComponent implements OnInit {
  card: CardHolder;

  constructor(private socketService: SocketService, private audioService: AudioService, private router: Router) {
  }

  ngOnInit() {
    this.socketService.stream.subscribe(packet => {
      if (packet.name === 'card-holder') {
        this.card = (packet as CardHolderPacket).cardHolder;
        console.log(JSON.stringify(this.card));
      }

      else if (packet.name === 'ready') {
        this.audioService.playBackground('disco');
        this.router.navigate(['/night']);
      }
    });
  }

  ready() {
    this.socketService.emit(new StringPacket('ready'));
  }
}
