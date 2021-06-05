import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { PatientService } from 'src/app/services/patient/patient.service';
import { UserService } from 'src/app/services/user/user.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.styl']
})
export class RegisterUserComponent implements OnInit {

  registerGroup!: FormGroup;  
  roles = [
    "Psycholoog",
    "Arts",
    "Ergotherapeut",
    "Dietist",
    "Logopedist"
  ]
  
  constructor(private fb : FormBuilder, private _auth : AuthService, private _router : Router, private _user : UserService, private _patient : PatientService) { }

  ngOnInit(): void {
    if(!this._auth.loggedIn()) {
      this._router.navigate(['/home'])
    } else {
      this.registerGroup = this.fb.group({
        email: ['',[Validators.required]],
        firstName:['',[Validators.required]],
        lastName:['', [Validators.required]],
        password: ['',[Validators.required]],
        role : ['',[Validators.required]]
      })
    }
    
  }

  get form() {
    return this.registerGroup.controls;
  }

  register() {
    this._user.register(this.registerGroup.value)
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


