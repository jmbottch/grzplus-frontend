import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { InformationService } from 'src/app/services/information.service';
import { PatientService } from 'src/app/services/patient/patient.service';
import { ClientDashboardComponent } from '../../client-dashboard/client-dashboard.component';
import { DashboardComponent } from '../../dashboard.component';
import { UserDashboardComponent } from '../../user-dashboard/user-dashboard.component';

@Component({
  selector: 'app-adl-card',
  templateUrl: './adl-card.component.html',
  styleUrls: ['./adl-card.component.styl']
})
export class AdlCardComponent implements OnInit {

  @Input() patient: any;

  adls! : any;

  editForm!: any;
  edit = false;

  usertype! : any



  constructor(private userDashboard: UserDashboardComponent,
    private dashboard : DashboardComponent,
    private clientDashboard: ClientDashboardComponent,
    private _info: InformationService,
    private fb: FormBuilder,
    private _patient : PatientService
  ) { }

  ngOnInit(): void {
    this.usertype = this.dashboard.usertype
    this._info.getADL()
    .subscribe(
      res => this.adls = res,
      err => console.log(err)
    ),
    this.editForm = this.fb.group({
      showeringTop: ['', []],
      showeringBottom: ['', []],
      washingTop: ['', []],
      washingBottom: ['', []],
      dressingTop: ['', []],
      dressingBottom: ['', []],
      toilet: ['', []],
      bed: ['', []]
    })
  }

  toggleEdit() {
    if(this.edit == true) this.edit = false;
    else this.edit = true;
  }

  close() {
    this.userDashboard.removeSelectedCard()
    this.clientDashboard.removeSelectedCard()
  }

  editADL() {
    this._patient.editADL(this.patient._id, this.editForm.value)
    .subscribe(
      res => {        
        this.edit = false
        alert("Gegevens zijn bijgewerkt, ververs de pagina om de bijgewerkte gegevens te zien.")
        
      },
      err => {
        console.log(err)
      }
    )
  }
}
