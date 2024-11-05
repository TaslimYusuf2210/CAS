import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { Column, GenericTableComponent, IActionMenu } from '../../generic-table/generic-table.component';
import { recordsModel } from './recordModels';
import { Router } from '@angular/router';
import { GlobalService } from '../../global.service';

@Component({
  selector: 'app-records',
  standalone: true,
  imports: [ GenericTableComponent],
  templateUrl: './records.component.html',
  styleUrl: './records.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecordsComponent implements AfterViewInit {
  
  ngAfterViewInit(): void {
    this.getData()
  }

  constructor(private router:Router, private cd: ChangeDetectorRef, public globalService: GlobalService ){
    
  }
  
  public dataList: recordsModel[] | any[] = [];
  
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
    { header: 'firstName', columnDef: 'firstName' },
    { header: 'lastName', columnDef: 'lastName' },
    { header: 'state', columnDef: 'state' },
    { header: 'gender', columnDef: 'gender', type: 'status'},
    { header: 'dateCreated', columnDef: 'dateCreated'},
    { header: 'dateUpdated', columnDef: 'dateUpdated'},
  ];


  selectedActionButton(event: any) {
    let selectedRow = event.selectedRow as recordsModel;
    let selectedMenu = event.selectedMenu as IActionMenu;
    if (selectedMenu.id === 1) {
      this.view(selectedRow)
    }else if (selectedMenu.id === 2) {
      this.onDelete(selectedRow)
    }
  }

  view (e:recordsModel){
    this.router.navigate([`cas/records/${e.id}`])
  }
  
  getData(){
    const value = JSON.parse(localStorage.getItem('formEntries') || '')
    this.dataList = value;
  }

  onDelete(row:recordsModel){
    let index = this.dataList.map((value, index) => value.id === row.id ? index: -1).filter((index) => index !== -1)[0]
    this.dataList.splice(index, 1)
    localStorage.setItem('formEntries', JSON.stringify(this.dataList))
    this.dataList = JSON.parse(localStorage.getItem('formEntries') || '')
  }
}
