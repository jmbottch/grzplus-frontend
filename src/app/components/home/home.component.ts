import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.styl']
})
export class HomeComponent implements OnInit {

  constructor(private fb : FormBuilder, private _auth : AuthService, private _router : Router) { }
  loginGroup!: FormGroup;
  
  ngOnInit(): void {
    this.loginGroup = this.fb.group({
      email: ['',[Validators.required]],
      password: ['',[Validators.required]]
    })
  }

  get form() {
    return this.loginGroup.controls;
  }

  login() {
    this._auth.login(this.loginGroup.value)
    .subscribe(
      res => {
        localStorage.setItem('token', res.token)
        console.log(res.token)
        this._router.navigate(['/dashboard']);
      },
      err => {
        console.log(err)
      }
    )
  }

}
