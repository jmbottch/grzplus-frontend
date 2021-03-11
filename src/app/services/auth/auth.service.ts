import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user/user.service';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _registerUrl = "http://localhost:3000/api/users";
  private _loginUrl = "http://localhost:3000/api/users/login";

  constructor(private http: HttpClient, private _router: Router, private _user: UserService) { }

  register(user: any) {
    return this.http.post<any>(this._registerUrl, user)
  }

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
}
