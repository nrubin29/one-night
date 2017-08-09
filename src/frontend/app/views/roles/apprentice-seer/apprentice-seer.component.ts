import { Component, OnInit } from '@angular/core';
import CardHolder from '../../../../../common/card-holder';
import { RoleComponent } from '../../role/role.component';

@Component({
  selector: 'app-apprentice-seer',
  templateUrl: './apprentice-seer.component.html',
  styleUrls: ['./apprentice-seer.component.scss']
})
export class ApprenticeSeerComponent implements OnInit {
  centerCards: CardHolder[];

  constructor(private roleComponent: RoleComponent) {
  }

  ngOnInit() {
    this.centerCards = this.roleComponent.packet.centerCards as CardHolder[];
  }
}
