import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';
import  jwt_decode  from 'jwt-decode';
import { Router } from '@angular/router';
import { PatientService } from 'src/app/services/patient/patient.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.styl']
})

export class DashboardComponent implements OnInit {

  constructor(private fb : FormBuilder, private _user : UserService, private _auth : AuthService, private _router : Router, private _patient : PatientService) { }
  
  patients : any;
  usertype : any;
  user: any;
  decoded? : TokenSchema;
  selectedForm! : FormGroup;
  selected! : any
  selectedPractitioner! : any
  
  ngOnInit(): void {    
    if(!this._auth.loggedIn()) {
      this._router.navigate(['home'])
    } else {
      this.decoded = jwt_decode(this._auth.getToken()!);
      this._user.getSingle(this.decoded?.id)
      .subscribe(
        res => {
          if(res != null) {
            this.usertype = 'user'
            this.user = res;
            // console.log(res, this.usertype)
            this._patient.getAll()
            .subscribe(
              res => {
                this.patients = res;
              },
              err => {
                console.log(err)
              }
            ),
            this.selectedForm = this.fb.group({
              selected : []
            })
          } else {
            this._patient.getSingle(this.decoded?.id)
            .subscribe(
              res => {
                if(res != null) {   
                  this.usertype = 'patient'
                  this.user = res
                  // console.log(res, this.usertype)
                }
              }, 
              err => console.log(err)
            )            
          }
        },
        err => {
          console.log(err)
        }
      )
    }
  }

  get form() {
    return this.selectedForm.controls;
  }

  onSelect() {
    this.selected = this.selectedForm.value.selected
    console.log(this.selected)
  }

  onSelectPractitioner(practitioner : any) {
    this.selectedPractitioner = practitioner    
  }

}

interface TokenSchema {
  id: string,
  iat : number,
  exp: number

}

