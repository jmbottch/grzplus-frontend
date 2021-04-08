import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user/user.service';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _loginUrl = "https://grzplusbackend.herokuapp.com/api/users/login";
  private _authUrl = "https://grzplusbackend.herokuapp.com/api/auth/patient";

  constructor(private http: HttpClient, private _router: Router, private _user: UserService) { }

  

  login(user: any) {
    return this.http.post<any>(this._loginUrl, user)
  }

  getToken() {
    return localStorage.getItem('token');
  }

  logout() {
    return localStorage.removeItem('token');
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }

  loggedInAsPatient(token : any) {
    this.http.post<any>(this._authUrl, token)
    .subscribe(
      res => {
        if(res.loggedInAsPatient) return true
        else return false
       },
      err => console.log(err)
    )
  }

  loggedInAsUser(usertype : any) {
    var loggedIn = this.loggedIn()
    var isuser = usertype == "user" 
    if(loggedIn && isuser) {
      return true
    } else {
      return false
    }
  }
}
