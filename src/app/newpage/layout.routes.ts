import { Routes } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { DetailFormComponent } from '../pages/detail-form/detail-form.component';
import { NewpageComponent } from '../newpage/newpage.component';
import { RecordsComponent } from '../pages/records/records.component';

export const layoutRoutes: Routes = [
  
  {path: '', component: NewpageComponent, 
    children:[
      {path: '', redirectTo: 'dashboard', pathMatch: 'full'},

    {path: 'dashboard', component: DashboardComponent},
    {path: 'records', component: RecordsComponent},
    {path: 'newpage', component: NewpageComponent},
    {path: 'records/:id', component: DetailFormComponent},
    {path: 'user-details', component: DetailFormComponent},   
    { path: '**', redirectTo: 'dashboard' } 
  ]},
  
];
