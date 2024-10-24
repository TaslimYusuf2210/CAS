import { Component } from '@angular/core';
import { FundModelService } from '../fund-model.service';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-fund-disbursement',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './fund-disbursement.component.html',
  styleUrl: './fund-disbursement.component.scss'
})
export class FundDisbursementComponent {

  public title: string = '';
  public description: string = '';
  public amount!: number;

  fundDisbursementForm:FormGroup = this.fb.group({
    title: ['', Validators.required],
    description:['', Validators.required],
    amount:['', Validators.required],

  })

  get f() {
    return this.fundDisbursementForm.controls;
  }

  constructor(private fb: FormBuilder){}

  onDisburse(){
    if (this.fundDisbursementForm.invalid) return;

    alert("Disbursement Successful")
  }
}
