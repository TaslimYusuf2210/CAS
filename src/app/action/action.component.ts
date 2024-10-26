import { Component } from '@angular/core';
import { FundDisbursementComponent } from './fund-disbursement/fund-disbursement.component';
import { PalliativeDistributionComponent } from './palliative-distribution/palliative-distribution.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-action',
  standalone: true,
  imports: [FundDisbursementComponent, PalliativeDistributionComponent, CommonModule],
  templateUrl: './action.component.html',
  styleUrl: './action.component.scss'
})
export class ActionComponent {

  public activeTab: string = '';

  setActiveTab(tab:string){
    this.activeTab = tab;
  }

}
