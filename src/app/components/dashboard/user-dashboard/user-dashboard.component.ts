import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PatientService } from 'src/app/services/patient/patient.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.styl']
})
export class UserDashboardComponent implements OnInit {

  patients!: any
  selectedForm!: FormGroup;
  selected!: any
  selectedPractitioner!: any

  constructor(private _patient: PatientService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this._patient.getAll()
      .subscribe(
        res => {
          this.patients = res;
        },
        err => {
          console.log(err)
        }
      ),
      this.selectedForm = this.fb.group({
        selected: []
      })
  }

  get form() {
    return this.selectedForm.controls;
  }

  onSelect() {
    this.selected = this.selectedForm.value.selected
    console.log(this.selected)
  }

  onSelectPractitioner(practitioner: any) {
    this.selectedPractitioner = practitioner
  }

}
