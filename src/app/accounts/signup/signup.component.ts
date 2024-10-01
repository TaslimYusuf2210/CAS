import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GlobalService } from '../../global.service';
import { SignupI } from './signupModel';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {

  signupForm: FormGroup = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required],
  })

  constructor(private fb: FormBuilder, public globalService: GlobalService){}

  get f() {
    return this.signupForm.controls
  }

  // onSubmit(){
  //   if(this.signupForm.invalid) return;
  //   const formData = this.signupForm.value;
  //   console.log("formdata",formData)
  //   this.globalService.saveData('signupDetails', formData)
  //   alert('form submitted successfully')

  //   let storedData = this.globalService.getData('signupDetails');
  //   console.log("storedData",storedData)
  //   let formValue = storedData? storedData : [];
  //   formValue.push(formData);
  //   this.globalService.saveData('signupDetails', formValue)
  //   console.log('local storage updated successfully', storedData)
    
    

  // }

  onSubmit() {
    if (this.signupForm.invalid) return;
  
    const formData = this.signupForm.value as SignupI;
    console.log(formData);
  
    // Retrieve the existing data from localStorage
    const existingData = localStorage.getItem('signupDetails');
  
    // Initialize an array to hold the data (existing + new)
    let updatedData = [];
  
    if (existingData) {
      try {
        // Parse the existing data if it exists and is valid JSON
        updatedData = JSON.parse(existingData);
  
        // Ensure updatedData is an array, otherwise initialize it as an empty array
        if (!Array.isArray(updatedData)) {
          updatedData = [];
        }
      } catch (error) {
        console.error("Error parsing localStorage data", error);
        updatedData = []; // Reset to an empty array if parsing fails
      }
    }
  
    // Add the new form data to the array
    updatedData.push(formData);
  
    // Store the updated array back to localStorage as a string
    localStorage.setItem('signupDetails', JSON.stringify(updatedData));
    console.log(updatedData)
    console.log(existingData)
  }
  
}
