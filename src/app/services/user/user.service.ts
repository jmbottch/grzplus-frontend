import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _users = "http://localhost:3000/api/users";

  constructor(private http: HttpClient, private _router: Router) { }

  getAll() {
    return this.http.get<any>(this._users)
  }

  register(user: any) {
    return this.http.post<any>(this._users, user)
  }

  getSingle(id: any) {
    return this.http.get<any>(this._users + '/' + id)
  }

}
