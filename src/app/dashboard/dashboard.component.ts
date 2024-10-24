import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DashboardNavbarComponent } from './dashboard-navbar/dashboard-navbar.component';
import { Chart1Component } from '../charts/chart1/chart1.component';
import { Chart2Component } from '../charts/chart2/chart2.component';
import { PieChartComponent } from '../charts/pie-chart/pie-chart.component';
import { DonutChartComponent } from '../charts/donut-chart/donut-chart.component';
import { CommonModule } from '@angular/common';
import { GlobalService } from '../global.service';
import { state } from '@angular/animations';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SidebarComponent, DashboardNavbarComponent,
     Chart1Component, Chart2Component, PieChartComponent,
      DonutChartComponent, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  public genderData:any = []

  public maritalStatusData:any = []

  public stateData:any = []

  public register!: number;
  public bachelor!: number;
  // public genderData = []
  // public genderData = []
  

  ngOnInit(): void {
    this.fetchGenderData()
    this.fetchMarriageStatusData()
    this.fetchStateGraphData()
    this.getRegisteredCitizen()
    this.getBachelors()
  }

  constructor(public globalService: GlobalService){}

  fetchGenderData (){
    let data = this.globalService.getData("formEntries")
    let male = data.filter((a:any)=> a.gender.toLowerCase()=== "male" )
    let female = data.filter((a:any)=> a.gender.toLowerCase()=== "female" )
    this.genderData.push({value: male.length, category: "male"})
    this.genderData.push({value: female.length, category: "female"})
  }

 fetchMarriageStatusData() {
  let data = this.globalService.getData("formEntries") || [];
  let married = data.filter((a: any) => a.maritalStatus.toLowerCase() === "married");
  let single = data.filter((a: any) => a.maritalStatus.toLowerCase() === "single");
  let divorced = data.filter((a: any) => a.maritalStatus.toLowerCase() === "divorced");
  let widowed = data.filter((a: any) => a.maritalStatus.toLowerCase() === "widowed");

  this.maritalStatusData = [
    { value: married.length, category: "married" },
    { value: single.length, category: "single" },
    { value: divorced.length, category: "divorced" },
    { value: widowed.length, category: "widowed" }
  ];

}

fetchStateGraphData() {
  let data = this.globalService.getData("formEntries") || [];

    const countStates = data.reduce((acc:any, item:any) => {
      if (acc[item.state]) {
        acc[item.state] += 1; // Increment the count if it does
      } else {
        acc[item.state] = 1; // Initialize the count if it doesn't
      }
      return acc;
    }, {});
    
    this.stateData = Object.keys(countStates).map(state => ({ category: state, value: countStates[state] }));
}

getRegisteredCitizen(){
  let data = this.globalService.getData("formEntries")
  this.register = data.length
  console.log(this.register)
  return this.register
}

getBachelors(){
  let data = this.globalService.getData("formEntries")
  console.log(data)
  let test = data.filter((value:any) => {
      return value.maritalStatus !== "married" && value.maritalStatus !== "divorced";
  })
  let test2 = (test.length/data.length) * 100
  this.bachelor = test2
  return this.bachelor
}

public stateChart = [
  { category: "Category A", value: 1},
  { category: "Category B", value: 2},
  { category: "Category C", value: 3}
]

  public pieChartDatas = [
    { category: "Category A", value: 40 },
    { category: "Category B", value: 30 },
    { category: "Category C", value: 20 },
    { category: "Category D", value: 10 }
  ]
  public chartData = [
    { category: "Category A", value: 40 },
    { category: "Category B", value: 30 },
    { category: "Category C", value: 20 },
    { category: "Category D", value: 10 }
  ]
}
