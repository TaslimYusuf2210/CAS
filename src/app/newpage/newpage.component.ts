import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-newpage',
  standalone: true,
  imports: [ RouterModule, MatSidenavModule, MatListModule],
  templateUrl: './newpage.component.html',
  styleUrl: './newpage.component.scss'
})
export class NewpageComponent {

  constructor(public authservice: AuthService){}

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
  public isMenuOpen = false;

  logoutButton () {
    this.authservice.logout()
    console.log(this.authservice.isLoggedIn)
  }

}
