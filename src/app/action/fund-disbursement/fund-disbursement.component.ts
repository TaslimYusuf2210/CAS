import { Component, AfterViewInit, SimpleChanges, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { fundModel } from './IfundModel';
import { GlobalService } from '../../global.service';
import { Column, GenericTableComponent, IActionMenu } from '../../generic-table/generic-table.component';
import { OnChanges } from '@angular/core';

@Component({
  selector: 'app-fund-disbursement',
  standalone: true,
  imports: [ReactiveFormsModule, GenericTableComponent],
  templateUrl: './fund-disbursement.component.html',
  styleUrl: './fund-disbursement.component.scss'
})
export class FundDisbursementComponent implements AfterViewInit, OnChanges, OnInit {

  public title: string = '';
  public description: string = '';
  public amount!: number;

  fundDisbursementTypes = [
    {
      name: 'Educational Grants and Scholarships',
      value: 'Educational Grants and Scholarships'
    },
    {
      name: 'Housing and Urban Development',
      value: 'Housing and Urban Development'
    },
    {
      name: 'Infrastructure and Community Development',
      value: 'Infrastructure and Community Development'
    },
    {
      name: 'Research and Innovation Funding',
      value: 'Research and Innovation Funding'
    },
    {
      name: ' Agricultural Subsidies',
      value: ' Agricultural Subsidies'
    },
    {
      name: 'Disaster Relief and Emergency Aid',
      value: 'Disaster Relief and Emergency Aid'
    },
    {
      name: 'Education and Student Aid',
      value: 'Education and Student Aid'
    },
    {
      name: 'Healthcare Funding',
      value: 'Healthcare Funding'
    },
    {
      name: 'Social Welfare Programs',
      value: 'Social Welfare Programs'
    },
    {
      name: 'Economic Stimulus Programs',
      value: 'Economic Stimulus Programs'
    },
    {
      name: 'Community Development Block Grants',
      value: 'Community Development Block Grants'
    },
    {
      name: "Veterans' Benefits and Services",
      value: "Veterans' Benefits and Services"
    },
    {
      name: 'Research and Development Grants',
      value: 'Research and Development Grants'
    },
    {
      name: 'Environmental Grants',
      value: 'Environmental Grants'
    },
    {
      name: 'Public Housing Assistance',
      value: 'Public Housing Assistance'
    },
  ]

  public dataList: fundModel[] = [];
  
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

  ngAfterViewInit(): void {
  }


  fundDisbursementForm:FormGroup = this.fb.group({
    title: ['', Validators.required],
    description:['', Validators.required],
    amount:['', Validators.required],
  })

  clearStorage(){
    localStorage.removeItem('fundDisbursementKey');

  }

  get f() {
    return this.fundDisbursementForm.controls;
  }

  constructor(private fb: FormBuilder, public globalService: GlobalService){}
  ngOnInit(): void {
    this.getData()
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.getData()
  }

  getData(){
    const value = this.globalService.getData('fundDisbursementKey')
    this.dataList = value;
    console.log(this.dataList)
    console.log(value)
  }

  onDisburse(){
    if (this.fundDisbursementForm.invalid) return;
    const formData = this.fundDisbursementForm.value as fundModel;
    const existingData = this.globalService.getData('fundDisbursementKey') ?? []
    let updatedData = []
    // updatedData = JSON.parse(existingData)!
    if(existingData.length >= 0){
      // if (!Array.isArray(updatedData)) {
      //   updatedData = []
      // }
        updatedData = existingData

        updatedData.push(formData);
        console.log(updatedData)
        
        this.globalService.saveData('fundDisbursementKey', updatedData)
        alert("Disbursement Successful")
    } else {
      updatedData.push(formData)
    }
  }
}
