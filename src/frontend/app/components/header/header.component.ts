import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  route: string;

  constructor(private location: Location, private router: Router) {

  }

  ngOnInit() {
    this.router.events.subscribe(() => {
      if (this.location.path() != '') {
        this.route = this.title(this.location.path().substr(1));
      }
    });
  }

  private title(str: string): string {
    let s = '';

    str.split('-').forEach(word => {
      s += word[0].toUpperCase() + word.substr(1) + ' '
    });

    return s.trim();
  }
}
