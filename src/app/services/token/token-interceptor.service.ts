import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService {

  constructor(private injector : Injector, private _auth : AuthService) { }

  // intercept(req, next) {
  //   let _auth = this.injector.get(AuthService);
  //   let tokenizedRequest = req.clone({
  //     setHeaders : {
  //       Authorization : `Bearer ${_auth.getToken()}`
  //     }
  //   })

  //   return next.handle(tokenizedRequest)
  // }
}
