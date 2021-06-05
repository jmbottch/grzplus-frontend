import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class InformationService {

  constructor(private http: HttpClient, private _router: Router) { }

  private _resus = "https://grzplusbackend.herokuapp.com/api/resus";
  private _mobility = "https://grzplusbackend.herokuapp.com/api/mobi";
  private _transfers = "https://grzplusbackend.herokuapp.com/api/transfer";
  private _fac = "https://grzplusbackend.herokuapp.com/api/fac";
  private _adl = "https://grzplusbackend.herokuapp.com/api/adl"

  getResus() {
    return this.http.get<any>(this._resus)
  }

  getMobility() {
    return this.http.get<any>(this._mobility)
  }

  getTransfers() {
    return this.http.get<any>(this._transfers)
  }
  getFacs() {
    return this.http.get<any>(this._fac)
  }
  getADL() {
    return this.http.get<any>(this._adl)
  }
  
  // getSingle(id: any) {
  //   return this.http.get<any>(this._patients + '/' + id)
  // }

  // register(patient : any) {
  //   return this.http.post<any>(this._patients, patient)
  // }

}
