import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private http: HttpClient, private _router: Router) { }

  private _patients = "http://localhost:3000/api/patients";

  getAll() {
    return this.http.get<any>(this._patients)
  }
  
  getSingle(id: any) {
    return this.http.get<any>(this._patients + '/' + id)
  }

  register(patient : any) {
    return this.http.post<any>(this._patients, patient)
  }


}
