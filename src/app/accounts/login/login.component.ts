import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GlobalService } from '../../global.service';
import { ILogin } from './loginModel';
import { CommonModule } from '@angular/common';
import { RouterModule, Route, Router } from '@angular/router';
import { AuthService } from '../../auth.service'
import { MatDialogModule, MatDialog, MatDialogRef } from '@angular/material/dialog'

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule, MatDialogModule,],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  public formValuesPresent:boolean = false;

 
  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
  })


  
  constructor(private fb: FormBuilder, public globalService: GlobalService, private router: Router, private authService: AuthService, private dialog: MatDialog, private dialogRef: MatDialogRef<LoginComponent>){}
  
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

    if (this.authService.loginUser(typedEmail, typedPassword)) {
      alert('Login successful');
      this.dialogRef.close()
      this.router.navigate(['/cas/dashboard'])
    } else {
      alert('Incorrect Password or Email')
    }

    // const formData = this.loginForm.value as ILogin;
    // let users = this.globalService.getData("signupDetails")
    // let emailExist = users.find((item:any) => item.email === typedEmail)
    // console.log(emailExist)
    // if (emailExist && emailExist.password.toLowerCase() === typedPassword.toLowerCase()) {
    //   alert("login successful")
    //   localStorage.setItem('loggedInUser', JSON.stringify(emailExist))
    //   this.router.navigate(['/dashboard'])
    // } else {
    //   alert("Incorrect Password or Email")
    // }
  }
}
