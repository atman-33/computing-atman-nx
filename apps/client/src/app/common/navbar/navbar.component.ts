import { Component } from '@angular/core';
import { AuthService } from '../../auth/shared/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})

export class NavbarComponent {
  public isNavbarDialogOpen = false;

  constructor(
    public auth: AuthService) {
  }

  toggleNavbarDialog() {
    console.log('Toggle clicked!');
    this.isNavbarDialogOpen = !this.isNavbarDialogOpen;
  }

  closeNavbarDialog() {
    console.log('closeNavbarDialog!');
    this.isNavbarDialogOpen = false;
  }

  signout() {
    this.auth.signout();
    this.isNavbarDialogOpen = false;
  }
}
