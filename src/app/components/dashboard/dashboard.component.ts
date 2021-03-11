import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';
import  jwt_decode  from 'jwt-decode';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.styl']
})

export class DashboardComponent implements OnInit {

  constructor(private _user : UserService, private _auth : AuthService, private _router : Router) { }
  
  user: any;
  decoded? : TokenSchema
  
  ngOnInit(): void {
    if(!this._auth.loggedIn()) {
      this._router.navigate(['home'])
    } else {
      this.decoded = jwt_decode(this._auth.getToken()!);
      this.user = this._user.getSingle(this.decoded?.id)
      .subscribe(
        res => {
          console.log(res.role)
          this.user = res;
        },
        err => {
          console.log(err)
        }
      )
    }
  }

}

interface TokenSchema {
  id: string,
  iat : number,
  exp: number

}
