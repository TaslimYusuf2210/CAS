import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { MatDialogModule, MatDialog } from '@angular/material/dialog'
import { LoginComponent } from '../accounts/login/login.component';

@Component({
  selector: 'app-landingpage',
  standalone: true,
  imports: [ NavbarComponent, MatDialogModule],
  templateUrl: './landingpage.component.html',
  styleUrl: './landingpage.component.scss'
})
export class LandingpageComponent {

  constructor(private dialog: MatDialog) {
    
  }
  openLogin() {
    this.dialog.open(LoginComponent, {
      width: '250px',
      height: '250px',
    })
  }
}
