import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { PatientService } from 'src/app/services/patient/patient.service';
import { UserService } from 'src/app/services/user/user.service';
import { UserDashboardComponent } from '../../user-dashboard/user-dashboard.component';

@Component({
  selector: 'app-practitioners-card',
  templateUrl: './practitioners-card.component.html',
  styleUrls: ['./practitioners-card.component.styl']
})
export class PractitionersCardComponent implements OnInit {

  @Input() patient : any;
  addNew : Boolean = false;
  users : any;
  selectedForm! : any;

  constructor(private userDashboard : UserDashboardComponent, private _user : UserService, private fb : FormBuilder, private _patient : PatientService, private _router : Router) { }

  ngOnInit(): void {
    this._user.getAll()
    .subscribe(
      res => {
        this.users = res
      },
      err => {
        console.log(err);
      }
    ),
    this.selectedForm = this.fb.group({
      practitioner: []
    })
  }
  
  close() {
    this.userDashboard.removeSelectedCard()
  }

  toggleAdd() {
    if(this.addNew == false) {
      this.addNew = true;
    } else {
      this.addNew = false;
    }
  }

  add() {
    console.log("were going now")
    this._patient.addUser(this.patient._id, this.selectedForm.value)
    .subscribe(
      res => {
        console.log(this.patient._id)
        console.log(this.selectedForm.value)
        console.log(res)
        this.userDashboard.removeSelectedCard()
        alert("Behandelaar is toegevoegd.")
        
      },
      err => {
        console.log(err)
      }
    )
    console.log("Its done")
    
  }
}
