import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GlobalService } from '../../global.service';
import { ILogin } from './loginModel';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  public formValuesPresent:boolean = false;

 
  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
  })


  
  constructor(private fb: FormBuilder, public globalService: GlobalService){}
  
  ngOnInit(): void {
    
  }
  
  get c() {
    return this.loginForm.controls
  }

  onLogin(){
    if (this.loginForm.invalid){
      this.formValuesPresent = true;
    };
    let typedEmail = this.loginForm.get('email')?.value;
    let typedPassword = this.loginForm.get('password')?.value;

    // const formData = this.loginForm.value as ILogin;
    let users = this.globalService.getData("signupDetails")
    let emailExist = users.find((item:any) => item.email === typedEmail)
    console.log(emailExist)
    if (emailExist && emailExist.password.toLowerCase() === typedPassword.toLowerCase()) {
      alert("login successful")
    } else {
      alert("Incorrect Password or Email")
    }
  }
}
