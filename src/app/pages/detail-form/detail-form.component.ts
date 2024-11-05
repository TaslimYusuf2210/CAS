import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { recordsModel } from '../records/recordModels';
import { ActivatedRoute } from '@angular/router';
import { GlobalService } from '../../global.service';

@Component({
  selector: 'app-detail-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './detail-form.component.html',
  styleUrl: './detail-form.component.scss',
})
export class DetailFormComponent implements OnInit {


  state:[] = []
  lga:[] = []
  town:[] = []

  enableForm?:boolean = true;
  
  bloodType = [
    {
      name: 'A+',
      value: 'A+'
    },
    {
      name: 'A-',
      value: 'A-'
    },
    {
      name: 'B+',
      value: 'B+'
    },
    {
      name: 'B-',
      value: 'B-'
    },
    {
      name: 'AB+',
      value: 'AB+'
    },
    {
      name: 'AB-',
      value: 'AB-'
    },
    {
      name: 'O+',
      value: 'O+'
    },
    {
      name: 'O-',
      value: 'O-'
    },
  ]

  gender = [
    {
      name: 'Male',
      value: 'male'
    },
    {
      name: 'Female',
      value: 'female',
    }
  ]

  maritalStatus = [
    {
      name: 'Single',
      value: 'single',
    },
    {
      name: 'Married',
      value: 'married',
    },
    {
      name: 'Divorced',
      value: 'divorced',
    },
    {
      name: 'Widowed',
      value: 'widowed',
    }
  ];

  religion = [
    {
      name: 'Islam',
      value: 'islam'
    },
    {
      name: 'Christianity',
      value: 'christianity'
    }
  ] 

  myForm: FormGroup = this.fb.group({
    firstName: ['', Validators.required],
    middleName: ['', Validators.required],
    lastName: ['', Validators.required],
    dateOfBirth: ['', Validators.required],
    gender: ['', Validators.required],
    maritalStatus: ['', Validators.required],
    bloodType: ['', Validators.required],
    NIN: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('^[0-9]+$')]],
    email: ['', [Validators.email]],
    streetName: ['', Validators.required],
    city: ['', Validators.required],
    state: ['', Validators.required],
    lga: ['', Validators.required],
    ethnicity: ['', Validators.required],
    religion: ['', Validators.required],
  });

  public existingId!: string 
  constructor(private fb: FormBuilder, private route:ActivatedRoute, public globalService: GlobalService) {
    let id;
    this.route.params.subscribe({
      next:(param ) => {
        id = param['id']
        if(id) {
          this.getData(id)
        }
      this.existingId = id
      }
    })
  }

  ngOnInit(): void {
    this.getState()

    this.f['state'].valueChanges.subscribe({
      next:(res)=> {
        this.getLGAbyState(res)

      }
    })
  }

  toggleForm(){
    this.enableForm = !this.enableForm
    if (this.enableForm) {
      this.myForm.enable()
    } else {
      this.myForm.disable()
    }
  }

  clearStorage(){
    localStorage.clear()
  }

  // getLgaByStateCode(stateCode:string) {
  //  this.lga = this.state.filter((a) => a.stateCode.toLowerCase()===stateCode.toLowerCase())
  // }

  // getTownByStateCode(name:string) {
  //   this.lga = this.state.filter((a) => a.name.toLowerCase()===name.toLowerCase())
  //  }

  getLGAbyState(state:string){
    this.globalService.getLGAbyStateCode(state).subscribe({
      next:(res) => {
        this.lga = res;
        console.log(res)
      },
      error:(err) => {
        console.log(err)
      },
    })
  }


  getState(){
    this.globalService.getstate().subscribe({
      next:(res:any) => {
        this.state = res;
        console.log(res)
      },
      error:(err) => {
        console.log(err)
      },
    })
  }

  onSubmit() {
    this.myForm.markAllAsTouched()  
    // Check if the form is valid
    if (this.myForm.invalid) return;
      // Get the values entered in the form (without the form object itself)
      const formData = this.myForm.value as recordsModel;
      const value = this.globalService.getData('formEntries')
    let  selectedIndex = value.findIndex((a:recordsModel) => a.id === this.existingId)
    console.log(selectedIndex)
    if(selectedIndex > -1) {
      let  selectedValue = value.find((a:recordsModel) => a.id === this.existingId)
      formData.id = selectedValue.id
      formData.dateUpdated = new Date().toString()
      value[selectedIndex] = formData
      console.log(value)
      this.globalService.saveData('formEntries', value)
      alert('Form data updated successfully.')
    }else{
      formData.id =  Math.random().toString(36).substr(2, 9) + '-' + Date.now();
      formData.dateCreated = new Date().toString()
  
      // Retrieve the existing data from local storage
      const storedData = this.globalService.getData('formEntries')
      // Parse the existing data or initialize an empty array
      let formEntries = storedData ? storedData : [];
  
      // Add the new form data to the array
      formEntries.push(formData);
      console.log(formEntries)
  
      // Save the updated array back to local storage
      this.globalService.saveData('formEntries', formEntries)
      console.log('Form data saved successfully.', this.myForm.value);}
    
  }
  
  update() {
    const value = JSON.parse(localStorage.getItem('formEntries') || '')
    let  selectedIndex = value.findIndex((a:recordsModel) => a.id === this.existingId)
    if(selectedIndex > -1) {
      value[selectedIndex] = this.myForm.value
    }
  }

  get f() {
    return this.myForm.controls
  }

  get nestForm () {
    return this.myForm.get
  }

  selectedValue!: recordsModel;

  getData(id:string){
    const value = JSON.parse(localStorage.getItem('formEntries') || '')
    let  selectedValue = value.find((a:recordsModel) => a.id === id)
    if(selectedValue){
      this.myForm.patchValue(selectedValue)
      this.myForm.disable()
      this.selectedValue = selectedValue
      this.enableForm = false
    }
  }
}
