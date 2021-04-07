import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  

  constructor(private fb: FormBuilder, private _patient: PatientService, private _router: Router, private _info: InformationService, private _user : UserService) { }

  ngOnInit(): void {
    this.registerGroup = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      dateOfBirth: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      dateOfDeparture: ['', [Validators.required]],
      practitioners: [[], [Validators.required]],
      resuscitation: ['', []],
      roomNr:['',[Validators.required]]
    }),
      this.resuscitations = this._info.getResus()
        .subscribe(
          res => {
            this.resuscitations = res;
          },
          err => {
            console.log(err)
          }
        ),
      this.practitioners = this._user.getAll()
        .subscribe(
          res => {
            this.practitioners = res
          },
          err => {
            console.log(err)
          }
        )

  }

  register() {
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
