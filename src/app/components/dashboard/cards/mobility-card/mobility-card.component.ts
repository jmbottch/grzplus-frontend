import { Component, Input, OnInit } from '@angular/core';
import { ClientDashboardComponent } from '../../client-dashboard/client-dashboard.component';
import { UserDashboardComponent } from '../../user-dashboard/user-dashboard.component';

@Component({
  selector: 'app-mobility-card',
  templateUrl: './mobility-card.component.html',
  styleUrls: ['./mobility-card.component.styl']
})
export class MobilityCardComponent implements OnInit {

  @Input() patient : any;
  constructor(private userDashboard : UserDashboardComponent, private clientDashboard : ClientDashboardComponent) { }

  ngOnInit(): void {
  }
  
  close() {
    this.userDashboard.removeSelectedCard()
    this.clientDashboard.removeSelectedCard()
  }
}
