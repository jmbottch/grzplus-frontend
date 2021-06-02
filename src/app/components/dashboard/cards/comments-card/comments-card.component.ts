import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PatientService } from 'src/app/services/patient/patient.service';
import { ClientDashboardComponent } from '../../client-dashboard/client-dashboard.component';
import { DashboardComponent } from '../../dashboard.component';
import { UserDashboardComponent } from '../../user-dashboard/user-dashboard.component';

@Component({
  selector: 'app-comments-card',
  templateUrl: './comments-card.component.html',
  styleUrls: ['./comments-card.component.styl']
})
export class CommentsCardComponent implements OnInit {

  @Input() patient : any;

  commentForm : any;
  comments! : Array<any>;
  

  
  
  constructor(
    private userDashboard : UserDashboardComponent, 
    private fb : FormBuilder, 
    private dashboardComponent : DashboardComponent,
    private _patient : PatientService,
    private clientDashboard : ClientDashboardComponent
    ) { }

  ngOnInit(): void {
    this.comments = this.patient.comments
    this.commentForm = this.fb.group({
      author: this.dashboardComponent.user.firstName + " " + this.dashboardComponent.user.lastName,
      content: ['',[Validators.required]]
    })
  }

  checkOwnComment(author : string) {
    if(author == this.dashboardComponent.user.firstName! + " " + this.dashboardComponent.user.lastName!) {
      return true;
    } else {
      return false;
    }
    
  }
  

  close() {
    this.userDashboard.removeSelectedCard()
    this.clientDashboard.removeSelectedCard()
  }

  addComment() {
    console.log(this.commentForm.value)
    this.comments.push(this.commentForm.value)
    this._patient.addComment(this.patient._id, this.commentForm.value)
    // console.log(this.patient._id, this.commentForm.value)
    .subscribe(
      res => {
        console.log(res)
      },
      err => console.log(err)
    )
  }
}
