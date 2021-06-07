import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { InformationService } from 'src/app/services/information.service';
import { PatientService } from 'src/app/services/patient/patient.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-register-patient',
  templateUrl: './register-patient.component.html',
  styleUrls: ['./register-patient.component.styl']
})
export class RegisterPatientComponent implements OnInit {

  registerGroup!: FormGroup

  resuscitations!: any
  practitioners!: any
  mobilities!: any;
  transfers!: any;
  facscores!: any;
  adls!: any;


  constructor(private fb: FormBuilder, private _patient: PatientService, private _router: Router, private _info: InformationService, private _user: UserService) { }

  ngOnInit(): void {
    this._info.getResus()
      .subscribe(
        res => this.resuscitations = res,
        err => console.log(err)
      ),
      this._user.getAll()
        .subscribe(
          res => this.practitioners = res,
          err => console.log(err)
        ),
      this._info.getMobility()
        .subscribe(
          res => this.mobilities = res,
          err => console.log(err)
        ),
      this._info.getTransfers()
        .subscribe(
          res => this.transfers = res,
          err => console.log(err)
        ),
      this._info.getFacs()
        .subscribe(
          res => this.facscores = res,
          err => console.log(err)
        ),
      this._info.getADL()
        .subscribe(
          res => this.adls = res,
          err => console.log(err)
        ),
      this.registerGroup = this.fb.group({
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        dateOfBirth: ['', [Validators.required]],
        email: ['', [Validators.required]],
        password: ['', [Validators.required]],
        dateOfDeparture: ['', [Validators.required]],
        practitioners: [[], [Validators.required]],
        resuscitation: ['', []],
        dietAdvice: this.fb.group({
          breakfast: ['', []],
          lunch: ['', []],
          dinner: ['', []]
        }),
        swallowAdvice: this.fb.group({
          consistency: this.fb.group({
            drinks: ['', []],
            regularmeal: ['', []],
            soup: ['', []],
            bread: ['', []],
            snacks: ['', []],
          }),
          assistance: this.fb.array([]),
          movements: this.fb.array([]),
          tools: this.fb.array([]),
          hygiene: this.fb.array([]),
          medication: this.fb.array([]),

        }),
        mainGoal: ['', []],
        subGoals: this.fb.array([]),
        exercises: this.fb.array([]),
        appointments: this.fb.array([]),
        comments: this.fb.array([]),
        transfer: this.fb.group({
          transfer: [null, []],
          facscore: [null, []]
        }),
        mobilityInRoom: this.fb.group({
          mobility: [null, []],
          facscore: [null, []]
        }),
        mobilityOnDepartment: this.fb.group({
          mobility: [null, []],
          facscore: [null, []]
        }),
        mobilityOffDepartment: this.fb.group({
          mobility: [null, []],
          facscore: [null, []]
        }),
        adl: this.fb.group({
          showeringTop: [null, []],
          showeringBottom: [null, []],
          washingTop: [null, []],
          washingBottom: [null, []],
          dressingTop: [null, []],
          dressingBottom: [null, []],
          toilet: [null, []],
          bed: [null, []]
        })
      })

  }

  get assistance() {
    return this.registerGroup.controls.swallowAdvice.get('assistance') as FormArray
  }

  addAssistance() {
    this.assistance.push(this.fb.control(''));
  }

  get movements() {
    return this.registerGroup.controls.swallowAdvice.get('movements') as FormArray;
  }

  addMovement() {
    this.movements.push(this.fb.control(''));
  }

  get tools() {
    return this.registerGroup.controls.swallowAdvice.get('tools') as FormArray;
  }

  addTool() {
    this.tools.push(this.fb.control(''));
  }

  get hygiene() {
    return this.registerGroup.controls.swallowAdvice.get('hygiene') as FormArray;
  }

  addHygiene() {
    this.hygiene.push(this.fb.control(''));
  }

  get medication() {
    return this.registerGroup.controls.swallowAdvice.get('medication') as FormArray;
  }

  addMedication() {
    this.medication.push(this.fb.control(''));
  }

  get subGoals() {
    return this.registerGroup.get('subGoals') as FormArray;
  }

  addSubGoal() {
    this.subGoals.push(this.fb.control(''));
  }

  register() {
    console.log(this.registerGroup.value)
    this._patient.register(this.registerGroup.value)
      .subscribe(
        res => {
          alert("gebruiker is geregistreerd")
          this._router.navigate(['/dashboard'])
        },
        err => {
          console.log(err)
        }
      )
  }

}
