import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss']
})
export class CountdownComponent implements OnInit {
  @Input() time: number;
  private endTime: Date;
  timeString: string;

  private interval: number;

  constructor() {
  }

  ngOnInit() {
    this.endTime = new Date();
    this.endTime.setSeconds(this.endTime.getSeconds() + this.time);

    this.tick();
    this.interval = setInterval(() => this.tick(), 1000 / 2);
  }

  private tick() {
    const diff = new Date(this.endTime.valueOf() - new Date().valueOf());
    this.timeString = [diff.getMinutes(), diff.getSeconds()].map(x => this.pad(x)).join(':');

    if (diff.getSeconds() < 0) {
      clearInterval(this.interval);
    }
  }

  private pad(x: number, size: number = 2) {
    let s = x.toString();
    while (s.length < (size || 2)) {
      s = '0' + s;
    }
    return s;
  }
}
