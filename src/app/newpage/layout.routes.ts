import { Routes } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { DetailFormComponent } from '../pages/detail-form/detail-form.component';
import { NewpageComponent } from '../newpage/newpage.component';
import { RecordsComponent } from '../pages/records/records.component';
import { authGuard } from '../auth.guard';

export const layoutRoutes: Routes = [
  {
    path: '',
    component: NewpageComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

      { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard], },
      { path: 'records', component: RecordsComponent, canActivate: [authGuard], },
      // { path: 'newpage', component: NewpageComponent, canActivate: [authGuard], },
      { path: 'records/:id', component: DetailFormComponent, canActivate: [authGuard], },
      { path: 'user-details', component: DetailFormComponent, canActivate: [authGuard], },
      { path: '**', redirectTo: 'dashboard' },
    ],
  },
];
