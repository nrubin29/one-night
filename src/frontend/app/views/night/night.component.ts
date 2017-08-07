import {Component, OnInit} from '@angular/core';
import {SocketService} from "../../services/socket.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-night',
  templateUrl: './night.component.html',
  styleUrls: ['./night.component.scss']
})
export class NightComponent implements OnInit {

  constructor(private socketService: SocketService, private router: Router) {
  }

  ngOnInit() {
    this.socketService.stream.subscribe(data => {
      if (data.event === 'view-cards') {
        this.socketService.data = data;
        this.router.navigate(['/view-cards']);
      }

      else if (data.event === 'view-players') {
        this.socketService.data = data;
        this.router.navigate(['/view-players']);
      }

      else if (data.event === 'day') {
        this.router.navigate(['/day']);
      }
    });
  }
}
