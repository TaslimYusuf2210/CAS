import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { GlobalService } from '../../global.service';
import { SignupI } from './signupModel';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  signupForm: FormGroup = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required],
  });

  public confirmUser:boolean = false;

  constructor(private fb: FormBuilder, public globalService: GlobalService) {}

  get f() {
    return this.signupForm.controls;
  }

  onSubmit() {
    if (this.signupForm.invalid) return;

    const formData = this.signupForm.value as SignupI;

    // Retrieve the existing data from localStorage
    const existingData = localStorage.getItem('signupDetails');
    console.log(existingData)

    // Initialize an array to hold the data (existing + new)
    let updatedData = [];

    const password = this.signupForm.get('password')?.value;
    const confirmPassword = this.signupForm.get('confirmPassword')?.value;
    const email = this.signupForm.get('email')?.value;

    if (password === confirmPassword) {

      if (existingData) {
       
        try {
          // Parse the existing data if it exists and is valid JSON
          updatedData = JSON.parse(existingData);
          console.log(updatedData)

          // Ensure updatedData is an array, otherwise initialize it as an empty array
          if (!Array.isArray(updatedData)) {
            updatedData = [];
          }
        } catch (error) {
          console.error('Error parsing localStorage data', error);
          updatedData = []; // Reset to an empty array if parsing fails
        }
        let checkEmailExist = updatedData.filter((a) => a.email.toLowerCase() === email.toLowerCase())
        console.log(checkEmailExist)

        if (checkEmailExist.length < 1) {
          // Add the new form data to the array
          updatedData.push(formData);

          // Store the updated array back to localStorage as a string
          localStorage.setItem('signupDetails', JSON.stringify(updatedData));
          alert('registration successful')
        } else {
          alert('Users exist')
        }

      }
    } else {
      this.confirmUser = true;
      console.log("We couldn't confirm your password")
    }
  }
}
