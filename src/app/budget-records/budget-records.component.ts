import { Component } from '@angular/core';
import { Column, GenericTableComponent, IActionMenu } from '../generic-table/generic-table.component';
import { MatDialogModule, MatDialog } from '@angular/material/dialog'
import { BudgetRecordModalComponent } from '../budget-record-modal/budget-record-modal.component';

@Component({
  selector: 'app-budget-records',
  standalone: true,
  imports: [MatDialogModule, GenericTableComponent],
  templateUrl: './budget-records.component.html',
  styleUrl: './budget-records.component.scss'
})
export class BudgetRecordsComponent {

  constructor(private dialog:MatDialog){}

  public columnList: Column[] = [
    { header: 'state', columnDef: 'state' },
    { header: 'amount', columnDef: 'amount' },
    { header: 'status', columnDef: 'status', type: 'status' },
  ];

  openModal() {
    this.dialog.open(BudgetRecordModalComponent, {
      width: '50vh',
      minHeight: 'auto'
    })
  }
}
