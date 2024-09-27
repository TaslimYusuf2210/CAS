import { Component } from '@angular/core';
import { MatDialogModule, MatDialog } from '@angular/material/dialog'
import { LoginComponent } from '../accounts/login/login.component';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  constructor(private dialog: MatDialog) {
    
  }
  openLogin() {
    this.dialog.open(LoginComponent, {
      width: '450px',
      height: '450px'
    })
  }
}
