// import { Component, AfterViewInit, SimpleChanges, OnInit } from '@angular/core';
// import {
//   ReactiveFormsModule,
//   FormBuilder,
//   FormGroup,
//   Validators,
// } from '@angular/forms';
// import { fundModel} from '../../'
// import { GlobalService } from '../../global.service';
// import { Column, GenericTableComponent, IActionMenu } from '../../generic-table/generic-table.component';
// import { OnChanges } from '@angular/core';
// import { Router } from '@angular/router';
// import { FormDisbursementFormComponent } from './form-disbursement-form/form-disbursement-form.component';


// @Component({
//   selector: 'app-fund-disbursement',
//   standalone: true,
//   imports: [ReactiveFormsModule, GenericTableComponent, FormDisbursementFormComponent],
//   templateUrl: './fund-disbursement.component.html',
//   styleUrl: './fund-disbursement.component.scss'
// })
// export class FundDisbursementComponent implements AfterViewInit, OnChanges, OnInit {

//   public title: string = '';
//   public description: string = '';
//   public amount!: number;

//   public dataList: fundModel[] = [];
  
//   public actionMenu: IActionMenu[] = [
//     {
//       id: 1,
//       name: 'View',
//       icon: 'edit',
//       class: '',
//     },
//     {
//       id: 2,
//       name: 'Delete',
//       icon: 'delete',
//       class: '!text-[#E30E00]',
//     },
//   ];

//   public columnList: Column[] = [
//     { header: 'title', columnDef: 'title' },
//     { header: 'amount', columnDef: 'amount' },
//     { header: 'description', columnDef: 'description' },
//   ];

//   ngAfterViewInit(): void {
//   }


//   fundDisbursementForm:FormGroup = this.fb.group({
//     title: ['', Validators.required],
//     description:['', Validators.required],
//     amount:['', Validators.required],
//   })

//   constructor(private fb: FormBuilder, public globalService: GlobalService, private router: Router){}
//   ngOnInit(): void {
//     this.getData()
//   }

//   ngOnChanges(changes: SimpleChanges): void {
//     this.getData()
//   }

//   selectedActionButton(event: any) {
//     let selectedRow = event.selectedRow as fundModel;
//     let selectedMenu = event.selectedMenu as IActionMenu;
//     if (selectedMenu.id === 1) {
//       this.view(selectedRow)
//     }else if (selectedMenu.id === 2) {
//       this.onDelete(selectedRow)
//     }
//   }

//   view(e:fundModel){
//     this.router.navigate([`cas/actionRecords/${e.id}`])
//   }

//   onDelete(row:fundModel){
//     let index = this.dataList.map((value, index) => value.id === row.id ? index: -1).filter((index) => index !== -1)[0]
//     this.dataList.splice(index, 1)
//     localStorage.setItem('fundDisbursementKey', JSON.stringify(this.dataList))
//     this.dataList = JSON.parse(localStorage.getItem('fundDisbursementKey') || '')
//   }

//   getData(){
//     const value = this.globalService.getData('fundDisbursementKey')
//     this.dataList = value;
//     console.log(this.dataList)
//     console.log(value)
//   }

  
// }
