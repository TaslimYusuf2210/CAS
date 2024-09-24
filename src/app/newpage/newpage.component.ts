import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-newpage',
  standalone: true,
  imports: [ RouterModule, MatSidenavModule, MatListModule],
  templateUrl: './newpage.component.html',
  styleUrl: './newpage.component.scss'
})
export class NewpageComponent {

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
  public isMenuOpen = false;
}
