import { Component, Input, OnInit } from '@angular/core';
import { UserDashboardComponent } from '../../user-dashboard/user-dashboard.component';

@Component({
  selector: 'app-practitioners-card',
  templateUrl: './practitioners-card.component.html',
  styleUrls: ['./practitioners-card.component.styl']
})
export class PractitionersCardComponent implements OnInit {

  @Input() patient : any;
  constructor(private userDashboard : UserDashboardComponent) { }

  ngOnInit(): void {
  }
  
  close() {
    this.userDashboard.removeSelectedCard()
  }
}
