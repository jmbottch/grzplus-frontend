import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PatientService } from 'src/app/services/patient/patient.service';
import { ClientDashboardComponent } from '../client-dashboard/client-dashboard.component';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.styl']
})
export class UserDashboardComponent implements OnInit {

  @ViewChild("blurme") blur : any;
  blurActive!: Boolean;
  
  patients!: any
  selectedForm!: FormGroup;
  selected!: any
  selectedPractitioner!: any

  selectedCard! : any

  constructor(private clientDashboard : ClientDashboardComponent, private _patient: PatientService, private fb: FormBuilder) { }

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
    console.log(this.selected.transfer)
  }

  onSelectPractitioner(practitioner: any) {
    this.selectedPractitioner = practitioner
  }

  onSelectCard(card : any) {
    if(this.selected != null) {
      this.blurActive = true;
      this.blur.nativeElement.classList.add("blur");
      this.selectedCard = card
    }
  }

  toggleBlur(): void {
    if (this.blurActive == true) {
      this.blurActive = false;
      this.blur.nativeElement.classList.remove("blur")
    }
    else if (this.blurActive == false) {
      this.blurActive = true;
      this.blur.nativeElement.classList.add("blur")
    }
  }
  removeSelectedCard() {
    this.toggleBlur();    
    this.selectedCard = null;    
  }
}
