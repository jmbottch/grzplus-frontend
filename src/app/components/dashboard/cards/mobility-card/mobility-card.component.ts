import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { InformationService } from 'src/app/services/information.service';
import { PatientService } from 'src/app/services/patient/patient.service';
import { ClientDashboardComponent } from '../../client-dashboard/client-dashboard.component';
import { DashboardComponent } from '../../dashboard.component';
import { UserDashboardComponent } from '../../user-dashboard/user-dashboard.component';

@Component({
  selector: 'app-mobility-card',
  templateUrl: './mobility-card.component.html',
  styleUrls: ['./mobility-card.component.styl']
})
export class MobilityCardComponent implements OnInit {

  @Input() patient: any;
  edit = false;
  editForm: any;

  mobilities!: any;
  transfers!: any;
  facscores!: any;

  usertype! : any;


  constructor(
    private userDashboard: UserDashboardComponent,
    private clientDashboard: ClientDashboardComponent,
    private fb: FormBuilder,
    private _info: InformationService,
    private _patient : PatientService,
    private dashboard : DashboardComponent
  ) { }

  ngOnInit(): void {
    this.usertype = this.dashboard.usertype
    this.editForm = new FormGroup({
      transfer: new FormGroup({
        transfer: new FormControl(''),
        facscore: new FormControl('')
      }),
      mobilityInRoom: new FormGroup({
        mobility: new FormControl(''),
        facscore: new FormControl('')
      }),
      mobilityOnDepartment: new FormGroup({
        mobility: new FormControl(''),
        facscore: new FormControl('')
      }),
      mobilityOffDepartment: new FormGroup({
        mobility: new FormControl(''),
        facscore: new FormControl('')
      })
    }),
      this.mobilities = this._info.getMobility()
        .subscribe(
          res => {
            this.mobilities = res
          },
          err => {
            console.log(err)
          }
        ),
      this.transfers = this._info.getTransfers()
        .subscribe(
          res => {
            this.transfers = res
          },
          err => {
            console.log(err)
          }
        ),
        this.facscores = this._info.getFacs()
        .subscribe(
          res => {
            this.facscores = res
          },
          err => {
            console.log(err)
          }
        )


  }

  toggleEdit() {
    if (this.edit == false) {
      this.edit = true
    } else {
      this.edit = false
    }
  }

  editDetails() {
    console.log(this.editForm.value)
    this._patient.editMobilityAndTransfer(this.patient._id, this.editForm.value)
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
  close() {
    this.userDashboard.removeSelectedCard()
    this.clientDashboard.removeSelectedCard()
  }
}
