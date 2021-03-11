import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.styl']
})
export class RegisterComponent implements OnInit {

  registerGroup!: FormGroup;

  roles = [
    "Client",
    "Administrator",
    "Psycholoog",
    "Arts"
  ]
  
  constructor(private fb : FormBuilder, private _auth : AuthService, private _router : Router) { }

  ngOnInit(): void {
    this.registerGroup = this.fb.group({
      email: ['',[Validators.required]],
      firstName:['',[Validators.required]],
      lastName:['', [Validators.required]],
      password: ['',[Validators.required]],
      role : ['',[Validators.required]]
    })
  }

  get form() {
    return this.registerGroup.controls;
  }

  register() {
    this._auth.register(this.registerGroup.value)
    .subscribe(
      res => {
        alert("gebruiker is geregistreerd")
        this._router.navigate(['/dashboard'])
      }, 
      err => {
        console.log(err)
      }
    )
  }

}
