import { Component, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { budgetModel } from './budgetModel';
import { CommonModule } from '@angular/common';
import { GlobalService } from '../../global.service';
import { ActivatedRoute } from '@angular/router';


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
  public isNothing = true;
  public filteredBudgetTypes:any[] = []

  enableForm:boolean = true;

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

  disbursementOption: string = ''

  itemBudget = [
    {
      name: 'Disaster Relief and Emergency Aid',
      type: 'item',
      value: 'Disaster Relief and Emergency Aid'
    },
    {
      name: "Veterans' Benefits and Services",
      type: 'item',
      value: "Veterans' Benefits and Services"
    },
    {
      name: "Palliative Aid for Inflation Relief",
      type: 'item',
      value: "Palliative Aid for Inflation Relief"
    },
    {
      name: "Humanitarian Relief for Refugees and Displaced Populations",
      type: 'item',
      value: "Humanitarian Relief for Refugees and Displaced Populations"
    },
    {
      name: "Mental Health and Wellness Aid Fund",
      type: 'item',
      value: "Mental Health and Wellness Aid Fund"
    },
    {
      name: "Food Relief for Crisis-Affected Communities",
      type: 'item',
      value: "Food Relief for Crisis-Affected Communities"
    },
    {
      name: "Economic Stabilization and Relief Palliative Support",
      type: 'item',
      value: "Economic Stabilization and Relief Palliative Support"
    },
  ]

  cashBudget = [
    {
      name: 'Educational Grants and Scholarships',
      type: 'cash',
      value: 'Educational Grants and Scholarships'
    },
    {
      name: 'Housing and Urban Development',
      type: 'cash',
      value: 'Housing and Urban Development'
    },
    {
      name: 'Infrastructure and Community Development',
      type: 'cash',
      value: 'Infrastructure and Community Development'
    },
    {
      name: 'Research and Innovation Funding',
      type: 'cash',
      value: 'Research and Innovation Funding'
    },
    {
      name: ' Agricultural Subsidies',
      type: 'cash',
      value: ' Agricultural Subsidies'
    },
    {
      name: 'Education and Student Aid',
      type: 'cash',
      value: 'Education and Student Aid'
    },
    {
      name: 'Healthcare Funding',
      type: 'cash',
      value: 'Healthcare Funding'
    },
    {
      name: 'Social Welfare Programs',
      type: 'cash',
      value: 'Social Welfare Programs'
    },
    {
      name: 'Economic Stimulus Programs',
      type: 'cash',
      value: 'Economic Stimulus Programs'
    },
    {
      name: 'Community Development Block Grants',
      type: 'cash',
      value: 'Community Development Block Grants'
    },
    {
      name: "Veterans' Benefits and Services",
      type: 'cash',
      value: "Veterans' Benefits and Services"
    },
    {
      name: 'Research and Development Grants',
      type: 'cash',
      value: 'Research and Development Grants'
    },
    {
      name: 'Environmental Grants',
      type: 'cash',
      value: 'Environmental Grants'
    },
    {
      name: 'Public Housing Assistance',
      type: 'cash',
      value: 'Public Housing Assistance'
    },
  ]
  
  disbursementForm:FormGroup = this.fb.group({
    disbursementType: ['', Validators.required],
    title: ['', Validators.required],
    description:['', Validators.required],
  })


  get f() {
    return this.disbursementForm.controls;
  }
  public title = this.disbursementForm.get('disbursementType')?.value;

  toggleSelect (){
    if (this.title == '') {
      this.isNothing = true;
      this.isMoney = false;
      this.isItem = false;
    } else if(this.title == 'money') {
      this.isNothing = false;
      this.isMoney = true;
      this.isItem = false;
    } else if (this.title == 'item'){
      this.isNothing = false;
      this.isMoney = false;
      this.isItem = true;
    }
  }

  ngOnInit(): void {
    // this.onTypeChange()
    // this.budgetTypesFilter(this.title)
  }

  public existingId!: string 
  constructor(private fb: FormBuilder, private route:ActivatedRoute, public globalService: GlobalService){
    let id;
    this.route.params.subscribe({
      next:(param ) => {
        id = param['id']
        if(id) {
          this.renderData(id)
        }
      this.existingId = id
      }
    })
  }

  toggleForm(){
    this.enableForm = !this.enableForm
    if (this.enableForm) {
      this.disbursementForm.enable()
    } else {
      this.disbursementForm.disable()
    }
  }

  onCreateBudget(){
    console.log('button clicked')
    if (this.disbursementForm.invalid) console.log('button invalid')
    let formData: budgetModel = {
      ...this.disbursementForm.value,
      status: 'pending'
    }
    let existingData = this.globalService.getData('budgetKey')
    // let updatedData = existingData ? JSON.parse(existingData) : [];
    let updatedData = []
    console.log("works but doesn't reach condition")
    const value = this.globalService.getData('budgetKey')
    let selectedIndex = value.findIndex((a:budgetModel) => a.id === this.existingId)
    
    if (existingData) {
      updatedData = existingData
      console.log(updatedData)
      console.log("data exists")
    } else {
      updatedData = []
    }

    updatedData.push(formData )
    this.globalService.saveData('budgetKey', updatedData)
    alert('Budget successfully created')
    location.reload()
    console.log('Data saved Successfully', updatedData)
  }

  onTypeChange(event:any) {
    const value = event.target.value
  
      if (value == 'money') {
        this.isMoney = true
        this.disbursementForm.addControl('amount', new FormControl(''));
        this.isItem = false
        this.disbursementForm.removeControl('number');
        this.isNothing = false

      } else if (value == 'item') {
        this.isItem = true
        this.disbursementForm.addControl('number', new FormControl(''));
        this.isMoney = false
        this.disbursementForm.removeControl('amount');
        this.isNothing = false
        // this.toggleSelect()
      }
    
  }


  clearStorage(){
    localStorage.removeItem('budgetKey')
  }

  // budgetTypesFilter(type:any){
  //   // if (type = 'item') {
  //   //   console.log('type is item')
  //   // } else if(type = 'cash') {
  //   //   console.log("type is cash")
  //   // }

  //   if (type == '') return
  //   console.log(type.target.value) 


  //   this.filteredBudgetTypes = [...this.budgetTypes].filter((value:any) => {
  //     if ( value.type === type) {
  //       console.log(type)
  //       return value
  //     }
  //    })
  // }

  selectedValue!: budgetModel;
  renderData(id:string){
    const value = JSON.parse(localStorage.getItem('budgetKey') || '')
    let selectedValue = value.find((item:budgetModel) => item.id === id)
    if (selectedValue) {
      this.disbursementForm.patchValue(selectedValue)
      this.disbursementForm.disable()
      this.selectedValue = selectedValue
      this.enableForm = false
    }
  }

}
