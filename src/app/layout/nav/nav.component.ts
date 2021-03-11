import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import jwt_decode from 'jwt-decode';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.styl']
})
export class NavComponent implements OnInit {

  constructor(private _user : UserService, private _auth: AuthService) { }

  user: any;
  admin? : Boolean
  decoded? : TokenSchema

  ngOnInit(): void {
    this.decoded = jwt_decode(this._auth.getToken()!);
    this.user = this._user.getSingle(this.decoded?.id)
      .subscribe(
        res => {
          console.log(res.role)
          if(res.role == 'Administrator') this.admin = true;
          this.user = res;
        },
        err => {
          console.log(err)
        }
      )

  }

  loggedIn() {
    return this._auth.loggedIn()
  }
}

interface TokenSchema {
  id: string,
  iat : number,
  exp: number

}
