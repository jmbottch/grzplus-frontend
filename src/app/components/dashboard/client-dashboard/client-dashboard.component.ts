import { Component, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-client-dashboard',
  templateUrl: './client-dashboard.component.html',
  styleUrls: ['./client-dashboard.component.styl']
})
export class ClientDashboardComponent implements OnInit {

  @Input() user : any;

  @ViewChild("blurme") blur : any;
  blurActive!: Boolean;

  selectedCard! : any
  
  constructor() { }

  ngOnInit(): void {
  }

  onSelectCard(card : any) {
    if(this.user != null) {
      this.blurActive = true;
      this.blur.nativeElement.classList.add("blur");
      this.selectedCard = card;
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
