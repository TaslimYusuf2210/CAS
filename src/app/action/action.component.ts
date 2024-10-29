import { Component } from '@angular/core';
// import { FundDisbursementComponent } from './fund-disbursement/fund-disbursement.component';
import { PalliativeDistributionComponent } from './palliative-distribution/palliative-distribution.component';
import { CommonModule } from '@angular/common';
import { Column, GenericTableComponent, IActionMenu } from '../generic-table/generic-table.component';
import { budgetModel } from '../action/fund-disbursement/budgetModel'
import { Router } from '@angular/router';

@Component({
  selector: 'app-action',
  standalone: true,
  imports: [ PalliativeDistributionComponent, CommonModule, GenericTableComponent ],
  templateUrl: './action.component.html',
  styleUrl: './action.component.scss'
})
export class ActionComponent {

  public dataList: budgetModel[] = [];
  
  public actionMenu: IActionMenu[] = [
    {
      id: 1,
      name: 'View',
      icon: 'edit',
      class: '',
    },
    {
      id: 2,
      name: 'Delete',
      icon: 'delete',
      class: '!text-[#E30E00]',
    },
  ];

  public columnList: Column[] = [
    { header: 'title', columnDef: 'title' },
    { header: 'amount', columnDef: 'amount' },
    { header: 'description', columnDef: 'description' },
  ];

  constructor(public router: Router){

  }

  selectedActionButton(event: any) {
    let selectedRow = event.selectedRow as budgetModel;
    let selectedMenu = event.selectedMenu as IActionMenu;
    if (selectedMenu.id === 1) {
      this.view(selectedRow)
    }else if (selectedMenu.id === 2) {
      this.onDelete(selectedRow)
    }
  }

  view(e:budgetModel){
    this.router.navigate([`cas/actionRecords/${e.id}`])
  }

  onDelete(row:budgetModel){
    let index = this.dataList.map((value, index) => value.id === row.id ? index: -1).filter((index) => index !== -1)[0]
    this.dataList.splice(index, 1)
    localStorage.setItem('fundDisbursementKey', JSON.stringify(this.dataList))
    this.dataList = JSON.parse(localStorage.getItem('fundDisbursementKey') || '')
  }


}
