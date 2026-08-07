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

  census:string = "https://nationalpopulation.gov.ng/icons/census_enumeration.svg"
  registration:string = "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcR5BB0nK8oI_TOsV_ZkoPBRc3BhwJwCeEuGbbhXexr39qITjT0E"
  survey:string = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRK0SxvlLkrAxWXbA8T1Z2KzREhJXf_5bw1b5SAi5toCyDLPtJP"
  management:string = "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcT1n040b3_gfJqiRE37jkt7mj35UAoVvz5yiw1bgfHGfEUdhT0d"
  unicef:string = "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQQkmecdwrbcfOUv047Mcga1INWmTv4tgw6XOSyf6dHJ7Q-0tjg"
  unfpa:string = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpNqGBRLvkmvggRvYLNxxt_Lio6B0YUTVvu-Ns9jYwrGK1qNBM"
  grid:string = "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRVIs2qDwur4Ki-YLuvZ2B8fXl7Yg0n3Gwd8X86XAg0_hC9icDm"
  usaid:string = "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTUBjU0jiKdRFIhQV3Lv6ln9m_5F_TiNQCD5iV3AsS7T1-AdvUm"


  constructor(private dialog: MatDialog) {
    
  }
  openLogin() {
    this.dialog.open(LoginComponent, {
      width: '60vw',
      height: '60vh',
    })
  }
}
