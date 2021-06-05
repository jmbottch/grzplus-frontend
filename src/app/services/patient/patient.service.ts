import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private http: HttpClient, private _router: Router) { }

  private _devpatients = "http://localhost:3000/api/patients"
  private _patients = "https://grzplusbackend.herokuapp.com/api/patients";

  getAll() {
    return this.http.get<any>(this._patients)
  }
  
  getSingle(id: any) {
    return this.http.get<any>(this._patients + '/' + id)
  }

  register(patient : any) {
    return this.http.post<any>(this._patients, patient)
  }

  addUser(patientId: any, userId: any) {
    return this.http.put<any>(this._patients + "/" + patientId + "/adduser", userId)
  }

  addComment(patientId: any, comment: any) {
    return this.http.put<any>(this._patients + "/" + patientId + "/addComment", comment)
  }

  editAdvice(patientId : any, data : any) {
    return this.http.put<any>(this._patients + "/" + patientId, data)
  }

  addAppointment(patientId : any, data : any) {
    return this.http.put<any>(this._patients + "/" + patientId + "/addAppointment", data)
  }

  editMainGoal(patientId : any, data : any) {
    return this.http.put<any>(this._patients + "/" + patientId + "/editMainGoal", data)
  }

  editSubGoals(patientId : any, data : any) {
    return this.http.put<any>(this._patients + "/" + patientId + "/editSubGoals", data)
  }

  editExercises(patientId : any, data : any) {
    return this.http.put<any>(this._patients + "/" + patientId + "/editExercises", data)
  }

  editMobilityAndTransfer(patientId : any, data : any) {
    return this.http.put<any>(this._patients+ "/" + patientId + "/editMobilityAndTransfer", data)
  }


}
