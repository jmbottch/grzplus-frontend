import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import * as e from 'cors';
import { InformationService } from 'src/app/services/information.service';
import { ClientDashboardComponent } from '../../client-dashboard/client-dashboard.component';
import { UserDashboardComponent } from '../../user-dashboard/user-dashboard.component';

@Component({
  selector: 'app-adl-card',
  templateUrl: './adl-card.component.html',
  styleUrls: ['./adl-card.component.styl']
})
export class AdlCardComponent implements OnInit {

  @Input() patient: any;

  adls! : any;

  editForm!: any;
  edit = false;



  constructor(private userDashboard: UserDashboardComponent,
    private clientDashboard: ClientDashboardComponent,
    // private _info: InformationService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    // this._info.getADL()
    // .subscribe(
    //   res => this.adls = res,
    //   err => console.log(err)
    // ),
    this.editForm = this.fb.group({
      showeringTop: ['', []],
      showeringBottom: ['', []],
      washingTop: ['', []],
      washingBottom: ['', []],
      dressingTop: ['', []],
      dressingBottom: ['', []],
      toilet: ['', []],
      bed: ['', []]
    })
  }

  toggleEdit() {
    if(this.edit == true) this.edit = false;
    else this.edit = true;
  }

  close() {
    this.userDashboard.removeSelectedCard()
    this.clientDashboard.removeSelectedCard()
  }
}
