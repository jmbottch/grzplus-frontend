import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import jwt_decode from 'jwt-decode';
import { UserService } from 'src/app/services/user/user.service';
import { PatientService } from 'src/app/services/patient/patient.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.styl']
})
export class NavComponent implements OnInit {

  constructor(private _router: Router, private _patient: PatientService, private _user: UserService, private _auth: AuthService) { }

  user: any;
  admin?: Boolean
  decoded?: TokenSchema
  usertype?: any
  isUser : Boolean = false

  ngOnInit(): void {
    this.decoded = jwt_decode(this._auth.getToken()!);
    this._user.getSingle(this.decoded?.id)
      .subscribe(
        res => {
          if (res != null) {
            this.isUser = true
            this.usertype = 'user'
            this.user = res;
            // console.log(res, this.usertype)            
          } else {
            this._patient.getSingle(this.decoded?.id)
              .subscribe(
                res => {
                  if (res != null) {
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

  loggedIn() {
    return this._auth.loggedIn()
  }

  logout() {
    this._router.navigate([''])
    this.usertype = null;
    return this._auth.logout();
  }

  // isUser() {
  //   return this._auth.loggedInAsUser(this.usertype!)
    
    // console.log(this._auth.loggedInAsUser(this.usertype))
    // var loggedIn = this._auth.loggedIn()
    // var isuser = this.usertype == "user"
    // var result
    // if(loggedIn && isuser) {
    //   return true
    // } else {
    //   return false
    // }
  // }
}

interface TokenSchema {
  id: string,
  iat: number,
  exp: number

}
