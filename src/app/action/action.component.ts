import { Component, AfterViewInit, ChangeDetectorRef } from '@angular/core';
// import { FundDisbursementComponent } from './fund-disbursement/fund-disbursement.component';
import { CommonModule } from '@angular/common';
import { Column, GenericTableComponent, IActionMenu } from '../generic-table/generic-table.component';
import { budgetModel } from './disbursement-form/budgetModel'
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialogModule, MatDialog } from '@angular/material/dialog'
import { DisbursementFormComponent } from './disbursement-form/disbursement-form.component';


@Component({
  selector: 'app-action',
  standalone: true,
  imports: [  CommonModule, GenericTableComponent, MatDialogModule ],
  templateUrl: './action.component.html',
  styleUrl: './action.component.scss'
})
export class ActionComponent implements AfterViewInit {

  public existingId! : string

  public dataList: budgetModel[] = [];
  
  public actionMenu: IActionMenu[] = [
    {
      id: 1,
      name: 'View',
      icon: 'edit',
      class: '',
    },
    {
      id: 3,
      name: 'Edit',
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
    { header: 'disbursement Type', columnDef: 'disbursementType' },
    { header: 'status', columnDef: 'status' },
  ];

  constructor(public router: Router, private route:ActivatedRoute, private dialog: MatDialog, private cdr: ChangeDetectorRef){
  }

  ngAfterViewInit(): void {
    this.getData()
  }

  openModal(actionToDo: 'UPDATE'|'INSERT', data?:any,){
    this.dialog.open(DisbursementFormComponent, {
      width: '50vw',
      minHeight: 'auto',
      data: {selectedRow: data, actionToDo:actionToDo}
    })
  }

  selectedActionButton(event: any) {
    let selectedRow = event.selectedRow as budgetModel;
    let selectedMenu = event.selectedMenu as IActionMenu;
    if (selectedMenu.id === 1) {
      this.view(selectedRow)
    }else if (selectedMenu.id === 2) {
      this.onDelete(selectedRow)
    }
    else if (selectedMenu.id === 3) {
      this.openModal('UPDATE', selectedRow)
    }
  }


  view(e:budgetModel){
    this.router.navigate([`cas/actionsRecord/${e.id}`])
  }

  onDelete(row:budgetModel){
    let index = this.dataList.map((value, index) =>  value.id === row.id ? index: -1).filter((index) => index !== -1)[0]
    this.dataList.splice(index, 1)
    localStorage.setItem('budgetKey', JSON.stringify(this.dataList))
    this.dataList = JSON.parse(localStorage.getItem('budgetKey') || '')
  }

  // loadData(){
  //   const value = JSON.parse(localStorage.getItem('budgetKey') || '')
  //   this.dataList = value;
  //   // this.cdr.detectChanges();
  // }

  getData(){
    const value = JSON.parse(localStorage.getItem('budgetKey') || '')
    this.dataList = value;
  }
}
