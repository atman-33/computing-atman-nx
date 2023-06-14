import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard {

  constructor( private authService : AuthService, private router : Router ) {
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  canActivate( route : ActivatedRouteSnapshot, state : RouterStateSnapshot ) {
    if(this.authService.isAuthenticated()) return true;
    // else navigate to login
    console.log('not authenticated!');
    this.router.navigate(['/signin']);
    return false;
  }
}