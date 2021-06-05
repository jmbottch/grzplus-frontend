import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { PatientService } from 'src/app/services/patient/patient.service';
import { ClientDashboardComponent } from '../../client-dashboard/client-dashboard.component';
import { DashboardComponent } from '../../dashboard.component';
import { UserDashboardComponent } from '../../user-dashboard/user-dashboard.component';

@Component({
  selector: 'app-advice-card',
  templateUrl: './advice-card.component.html',
  styleUrls: ['./advice-card.component.styl']
})
export class AdviceCardComponent implements OnInit {

  @Input() patient : any;
  edit = false;
  editForm : any;

  usertype! : any;

  // assistance! : FormArray;
  
  constructor(private fb : FormBuilder, 
    private userDashboard : UserDashboardComponent, 
    private clientDashboard : ClientDashboardComponent, 
    private _patient : PatientService,
    private dashboard : DashboardComponent
    ) { }


  ngOnInit(): void {
    this.usertype = this.dashboard.usertype
    this.editForm = this.fb.group({
      consistency : this.fb.group({
        drinks : ['',[]],
        regularmeal : ['',[]],
        soup : ['',[]],
        bread : ['',[]],
        snacks : ['',[]]
      }),
      dietAdvice : this.fb.group({
        breakfast : ['',[]],
        lunch : ['',[]],
        dinner : ['',[]]
      }),
      assistance : this.fb.array([]),
      movements : this.fb.array([]),
      tools : this.fb.array([]),
      hygiene : this.fb.array([]),
      medication : this.fb.array([])
    })
  }

  close() {
    this.userDashboard.removeSelectedCard()
    this.clientDashboard.removeSelectedCard()
  }

  toggleEdit() {
    if(this.edit == true) {
      this.edit = false;
    } else {
      this.edit = true;
    }
  }

  get assistance() {
    return this.editForm.get('assistance') as FormArray;
  }

  addAssistance() {
    this.assistance.push(this.fb.control(''));
  }

  get movements() {
    return this.editForm.get('movements') as FormArray;
  }

  addMovement() {
    this.movements.push(this.fb.control(''));
  }

  get tools() {
    return this.editForm.get('tools') as FormArray;
  }

  addTool() {
    this.tools.push(this.fb.control(''));
  }

  get hygiene() {
    return this.editForm.get('hygiene') as FormArray;
  }

  addHygiene() {
    this.hygiene.push(this.fb.control(''));
  }

  get medication() {
    return this.editForm.get('medication') as FormArray;
  }

  addMedication() {
    this.medication.push(this.fb.control(''));
  }

  editAdvice() {
    this._patient.editAdvice(this.patient._id, this.editForm.value)
    .subscribe(
      res => {        
        this.userDashboard.removeSelectedCard()
        alert("Gegevens zijn bijgewerkt, ververs de pagina om de bijgewerkte gegevens te zien.")
        
      },
      err => {
        console.log(err)
      }
    )
  }
}
