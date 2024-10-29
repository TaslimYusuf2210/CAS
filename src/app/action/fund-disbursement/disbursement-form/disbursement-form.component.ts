import { Component, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { budgetModel } from '../budgetModel';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-disbursement-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './disbursement-form.component.html',
  styleUrl: './disbursement-form.component.scss'
})
export class DisbursementFormComponent implements OnInit {

  public isMoney = false;
  public isItem = false;

  disbursementType = [
    {
      name: 'money',
      value: 'money'
    },
    {
      name: 'item',
      value: 'item'
    }
  ]

  budgetDepartments = [
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
  
  disbursementForm:FormGroup = this.fb.group({
    disbursementType: ['', Validators.required],
    title: ['', Validators.required],
    description:['', Validators.required],
    amount:['', Validators.required],
    number:['', Validators.required],
  })

  get f() {
    return this.disbursementForm.controls;
  }

  ngOnInit(): void {
    this.onTypeChange()
  }

  constructor(private fb: FormBuilder){}

  onCreateBudget(){
    if (this.disbursementForm.invalid) return

    let formData = this.disbursementForm.value
    
  }

  onTypeChange() {
    const selectedType = this.disbursementForm.get('disbursementType')?.value;

    this.disbursementForm.get('disbursementType')?.valueChanges.subscribe((value) => {
      if (value == 'money') {
        this.isMoney = true
        this.isItem = false
      } else if (value == 'item') {
        this.isItem = true
        this.isMoney = false

      }{
      }
    })
  }

}
