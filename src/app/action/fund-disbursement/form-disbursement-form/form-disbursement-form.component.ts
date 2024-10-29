// import { Component, Input, OnInit } from '@angular/core';
// import {
//   ReactiveFormsModule,
//   FormBuilder,
//   FormGroup,
//   Validators,
// } from '@angular/forms';

// import { GlobalService } from '../../../global.service';
// import { fundModel } from '../budgetModel';
// import { ActivatedRoute } from '@angular/router';


// @Component({
//   selector: 'app-form-disbursement-form',
//   standalone: true,
//   imports: [ReactiveFormsModule],
//   templateUrl: './form-disbursement-form.component.html',
//   styleUrl: './form-disbursement-form.component.scss'
// })
// export class FormDisbursementFormComponent implements OnInit {

//   enableForm:boolean = true;

//   @Input() dataList!: fundModel[];

//   fundDisbursementTypes = [
//     {
//       name: 'Educational Grants and Scholarships',
//       value: 'Educational Grants and Scholarships'
//     },
//     {
//       name: 'Housing and Urban Development',
//       value: 'Housing and Urban Development'
//     },
//     {
//       name: 'Infrastructure and Community Development',
//       value: 'Infrastructure and Community Development'
//     },
//     {
//       name: 'Research and Innovation Funding',
//       value: 'Research and Innovation Funding'
//     },
//     {
//       name: ' Agricultural Subsidies',
//       value: ' Agricultural Subsidies'
//     },
//     {
//       name: 'Disaster Relief and Emergency Aid',
//       value: 'Disaster Relief and Emergency Aid'
//     },
//     {
//       name: 'Education and Student Aid',
//       value: 'Education and Student Aid'
//     },
//     {
//       name: 'Healthcare Funding',
//       value: 'Healthcare Funding'
//     },
//     {
//       name: 'Social Welfare Programs',
//       value: 'Social Welfare Programs'
//     },
//     {
//       name: 'Economic Stimulus Programs',
//       value: 'Economic Stimulus Programs'
//     },
//     {
//       name: 'Community Development Block Grants',
//       value: 'Community Development Block Grants'
//     },
//     {
//       name: "Veterans' Benefits and Services",
//       value: "Veterans' Benefits and Services"
//     },
//     {
//       name: 'Research and Development Grants',
//       value: 'Research and Development Grants'
//     },
//     {
//       name: 'Environmental Grants',
//       value: 'Environmental Grants'
//     },
//     {
//       name: 'Public Housing Assistance',
//       value: 'Public Housing Assistance'
//     },
//   ]
  
//   fundDisbursementForm:FormGroup = this.fb.group({
//     title: ['', Validators.required],
//     description:['', Validators.required],
//     amount:['', Validators.required],
//   })

//   clearStorage(){
//     localStorage.removeItem('fundDisbursementKey');
//   }

//   get f() {
//     return this.fundDisbursementForm.controls;
//   }

//   public existingId!: string 

//   ngOnInit(): void {
//     // this.getData('')
//   }

//   constructor(private fb: FormBuilder, public globalService: GlobalService, private route:ActivatedRoute){
//     let id;
//     this.route.params.subscribe({
//       next:(param ) => {
//         id = param['id']
//         if(id) {
//           this.onViewDisbursement(id)
//         }
//       this.existingId = id
//       }
//     })
//   }

//   onDisburse(){
//     if (this.fundDisbursementForm.invalid) return;
//     const formData = this.fundDisbursementForm.value as fundModel;
//     const existingData = this.globalService.getData('fundDisbursementKey') ?? []
//     let selectedIndex = existingData.findIndex((a:fundModel) => a.id === this.existingId)
//     if(existingData.length >= 0){
//       let updatedData = []

//         updatedData = existingData

//         updatedData.push(formData);
//         console.log(updatedData)
        
//         this.globalService.saveData('fundDisbursementKey', updatedData)
//         alert("Disbursement Successful")
//         this.loadData()
//         } 
//         // else if (selectedIndex > -1) {
//         //   let  selectedValue = existingData.find((a:fundModel) => a.id === this.existingId)
//         //   formData.id = selectedValue.id
//         //   existingData[selectedIndex] = formData
//         //   this.globalService.saveData('formEntries', existingData)
//         //   alert('Form data updated successfully.')
//         // }


//         //     else {
//         //   updatedData.push(formData)
//         //   // this.getData(id)
//         // }

        
//           // let updatedData = []
//           // updatedData = JSON.parse(existingData)!
          

//   }

//   selectedValue!: fundModel;

//   toggleForm(){
//     this.enableForm = !this.enableForm
//     if (this.enableForm) {
//       this.fundDisbursementForm.enable()
//     } else {
//       this.fundDisbursementForm.disable()
//     }
//   }

//   onViewDisbursement(id:string){
//     const value = JSON.parse(localStorage.getItem('fundDisbursementKey') || '')
//     let  selectedValue = value.find((a:fundModel) => a.id === id)
//       if(selectedValue){
//         this.fundDisbursementForm.patchValue(selectedValue)
//         this.fundDisbursementForm.disable()
//         this.selectedValue = selectedValue
//         this.enableForm = false
//     }
//   }

//   loadData(){
//     const value = this.globalService.getData('fundDisbursementKey')
//     this.dataList = value;
//   }

//   // getData(id:string){
//   //   const value = this.globalService.getData('fundDisbursementKey')
//   //   let  selectedValue = value.find((a:fundModel) => a.id === id)
//   //   if(selectedValue){
//   //     this.fundDisbursementForm.patchValue(selectedValue)
//   //     this.fundDisbursementForm.disable()
//   //     this.selectedValue = selectedValue
//   //     this.enableForm = false
//   //   }
//   // }
  
  
  
// }
// function elseif(arg0: boolean) {
//   throw new Error('Function not implemented.');
// }

