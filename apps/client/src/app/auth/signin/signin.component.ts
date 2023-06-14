import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserCredentials } from 'libs/src/shared/models/user-credentials.model';
import * as httpErrorHelper from '../../shared/helpers/http-error-helper';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent {
  errors: string[] = [];

  constructor(
    private authService: AuthService,
    private router: Router) {
  }

  signin(signinForm: NgForm) {
    const userCredentials: UserCredentials = signinForm.value;
    // console.log(userCredentials);

    this.authService.signin(userCredentials).subscribe({
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      next: (token) => {
        // console.log(token);
        this.router.navigate(['/']);
      },
      error: (err: HttpErrorResponse) => {
        console.error(err);
        this.errors = httpErrorHelper.handleErrorMessage(err);
      },
    });
  }
}
