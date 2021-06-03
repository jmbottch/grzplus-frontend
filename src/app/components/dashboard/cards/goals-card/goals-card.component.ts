import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { PatientService } from 'src/app/services/patient/patient.service';
import { ClientDashboardComponent } from '../../client-dashboard/client-dashboard.component';
import { UserDashboardComponent } from '../../user-dashboard/user-dashboard.component';

@Component({
  selector: 'app-goals-card',
  templateUrl: './goals-card.component.html',
  styleUrls: ['./goals-card.component.styl']
})
export class GoalsCardComponent implements OnInit {

  @Input() patient: any;
  edit = false

  //edit forms
  mainGoalForm: any;
  subGoalsForm: any;
  exercisesForm: any;
  

  constructor(private userDashboard: UserDashboardComponent, private clientDashboard: ClientDashboardComponent, private fb: FormBuilder, private _patient: PatientService) { }

  ngOnInit(): void {
    this.mainGoalForm = this.fb.group({
      mainGoal: ['', []]
    })
    this.subGoalsForm = this.fb.group({
      subGoals: this.fb.array([])
    })
    this.exercisesForm = this.fb.group({
      exercises : this.fb.array([
        this.addExercise()
      ])
    })

  }

  get subGoals() {
    return this.subGoalsForm.get('subGoals') as FormArray;
  }

  addSubGoal() {
    this.subGoals.push(this.fb.control(''));
  }

  get exercises() {
    return this.exercisesForm.get('exercises') as FormArray;
  }

  addExercise() : FormGroup {
    return this.fb.group({
      title: ['', []],
      description : ['', []]
    })
  }
  
  addExerciseClick() : void{
    (<FormArray>this.exercisesForm.get('exercises')).push(this.addExercise())
  }

  toggleEdit() {
    if (this.edit == false) {
      this.edit = true;
    } else {
      this.edit = false
    }
  }

  editMainGoal() {
    this.patient.mainGoal = this.mainGoalForm.value.mainGoal
    this._patient.editMainGoal(this.patient._id, this.mainGoalForm.value)
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

  editSubGoals() {
    this.patient.subGoals = this.subGoalsForm.value.subGoals
    this._patient.editSubGoals(this.patient._id, this.subGoalsForm.value)
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
  
  editExercises() {
    console.log(this.exercisesForm.value)
    this._patient.editExercises(this.patient._id, this.exercisesForm.value)
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

  close() {
    this.userDashboard.removeSelectedCard()
    this.clientDashboard.removeSelectedCard()
  }
}

interface Exercise {
  title: string,
  description : string
}
