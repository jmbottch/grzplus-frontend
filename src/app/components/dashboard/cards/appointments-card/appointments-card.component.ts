import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PatientService } from 'src/app/services/patient/patient.service';
import { ClientDashboardComponent } from '../../client-dashboard/client-dashboard.component';
import { DashboardComponent } from '../../dashboard.component';
import { UserDashboardComponent } from '../../user-dashboard/user-dashboard.component';

@Component({
  selector: 'app-appointments-card',
  templateUrl: './appointments-card.component.html',
  styleUrls: ['./appointments-card.component.styl']
})

export class AppointmentsCardComponent implements OnInit {

  @Input() patient : any;
  appointments! : [Appointment];
  usertype! : any;

  form! : any;
  
  constructor(
    private userDashboard : UserDashboardComponent, 
    private clientDashboard : ClientDashboardComponent, 
    private dashboard : DashboardComponent,
    private fb : FormBuilder,
    private _patient : PatientService
    ) { }

  ngOnInit(): void {
    this.usertype = this.dashboard.usertype;
    this.appointments = this.patient.appointments;
    this.appointments.sort((a, b) => (a.date > b.date) ? 1 : -1);
    this.form = this.fb.group({
      description : ['',[]],
      date : ['',[]],     
      practitioner : this.dashboard.user._id
    })
  }

  close() {
    this.userDashboard.removeSelectedCard()
    this.clientDashboard.removeSelectedCard()
  }

  addAppointment() {    
    this._patient.addAppointment(this.patient._id, this.form.value)
    .subscribe(
      res => {        
        this.userDashboard.removeSelectedCard()
        alert("Gegevens zijn bijgewerkt, ververs de pagina om de bijgewerkte gegevens te zien.")
        
      },
      err => {
        console.log(err)
      }
    )
    console.table(this.form.value)
  }
}

interface Appointment {
  _id : any,
  date : Date,
  description : string,
  practitioner : any
}