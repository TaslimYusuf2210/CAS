import { Routes } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { DetailFormComponent } from '../pages/detail-form/detail-form.component';
import { NewpageComponent } from '../newpage/newpage.component';
import { RecordsComponent } from '../pages/records/records.component';
import { authGuard } from '../auth.guard';
import { ActionComponent } from '../action/action.component';
import { ActionRecordsComponent } from '../action-records/action-records.component';
// import { DisbursementFormComponent } from '../action/fund-disbursement/disbursement-form/disbursement-form.component';
import { DisbursementFormComponent } from '../action/disbursement-form/disbursement-form.component';
import { BudgetRecordsComponent } from '../budget-records/budget-records.component';

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
      { path: 'actions', component: ActionComponent, canActivate: [authGuard], },
      { path: 'actionsRecord/:id', component: BudgetRecordsComponent, canActivate: [authGuard], },      
      { path: 'disbursementForm', component: DisbursementFormComponent, canActivate: [authGuard], },
      { path: '**', redirectTo: 'dashboard' },
    ],
  },
];
