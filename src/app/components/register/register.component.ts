import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { PatientService } from 'src/app/services/patient/patient.service';
import { UserService } from 'src/app/services/user/user.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.styl']
})
export class RegisterComponent implements OnInit {

  // registerGroup!: FormGroup;  
  selectedForm! : FormGroup
  selected! : string

  roles = [
    "Revalidant",
    "Behandelaar",
    "Mantelzorger"
  ]
  
  constructor(private fb : FormBuilder, private _auth : AuthService, private _router : Router, private _user : UserService, private _patient : PatientService) { }

  ngOnInit(): void {
    if(!this._auth.loggedIn()) {
      this._router.navigate(['/home'])
    } else {
      this.selectedForm = this.fb.group({
        role: ['',[Validators.required]]        
      })
    }
    
  }

  onSelectRole() {
    this.selected = this.selectedForm.value.role
    console.log(this.selected)
  }  

}
