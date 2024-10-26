import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-palliative-distribution',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './palliative-distribution.component.html',
  styleUrl: './palliative-distribution.component.scss'
})
export class PalliativeDistributionComponent {

  itemOfDistribution = [
    {
      name:'rice',
      value:'rice'
    },
    {
      name:'beans',
      value:'beans'
    },
    {
      name:'pasta',
      value:'pasta'
    },
    {
      name:'noodles',
      value:'noodles'
    },
    {
      name:'yam',
      value:'yam'
    },
    {
      name:'garri',
      value:'garri'
    },
    {
      name:'cassava',
      value:'cassava'
    },
    {
      name:'potato',
      value:'potato'
    },
    {
      name:'maize',
      value:'maize'
    },
    {
      name:'flour',
      value:'flour'
    },
    {
      name:'guinea corn',
      value:'guinea corn'
    },
  ]

  palliativeDistributionForm:FormGroup = this.fb.group({
    name:['', Validators.required],
    note:['', Validators.required],
    itemOfDistribution:['', Validators.required],
    number:['', Validators.required],
  })

  get f() {
    return this.palliativeDistributionForm.controls;
  }

  constructor(private fb: FormBuilder){}

  onSubmit(){
    if (this.palliativeDistributionForm.invalid) return;

    alert('Distribution Successful')
  }
 
}
