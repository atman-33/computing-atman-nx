import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserRole } from 'libs/src/shared/enums/user-role.enum';
import { User } from 'libs/src/shared/models/user.model';
import * as httpErrorHelper from '../../shared/helpers/http-error-helper';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  errors: string[] = [];

  public userRoles: UserRole[] = [
    UserRole.MEMBER,
    UserRole.ADMINISTRATOR
  ];
  public defaultUserRoleId = 0;

  /**
   *
   */
  constructor(
    private authService: AuthService,
    private router: Router) {
  }

  signup(signupForm: NgForm) {
    let userData: User = signupForm.value;
    userData = {
      ...userData,
      role: this.userRoles[userData.role as unknown as number]
    };

    console.log(userData);

    this.authService.signup(userData).subscribe({
      next: () => {
        console.log('Signup success!');
        this.router.navigate(['/signin']);
      },
      error: (err: HttpErrorResponse) => {
        console.error(err);
        this.errors = httpErrorHelper.handleErrorMessage(err);
      },
    });
  }
}
