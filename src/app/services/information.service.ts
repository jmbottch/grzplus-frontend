import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class InformationService {

  constructor(private http: HttpClient, private _router: Router) { }

  private _resus = "https://grzplusbackend.herokuapp.com/api/resus";

  getResus() {
    return this.http.get<any>(this._resus)
  }
  
  // getSingle(id: any) {
  //   return this.http.get<any>(this._patients + '/' + id)
  // }

  // register(patient : any) {
  //   return this.http.post<any>(this._patients, patient)
  // }

}
