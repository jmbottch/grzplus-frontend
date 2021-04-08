import { Component, Input, OnInit } from '@angular/core';
import { UserDashboardComponent } from '../../user-dashboard/user-dashboard.component';

@Component({
  selector: 'app-advice-card',
  templateUrl: './advice-card.component.html',
  styleUrls: ['./advice-card.component.styl']
})
export class AdviceCardComponent implements OnInit {

  @Input() patient : any;
  
  constructor(private userDashboard : UserDashboardComponent) { }


  ngOnInit(): void {
    console.log(this.patient!.firstName!)
  }

  close() {
    this.userDashboard.removeSelectedCard()
  }

}
