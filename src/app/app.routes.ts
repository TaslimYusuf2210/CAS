import { Routes } from '@angular/router';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { SignupComponent } from './accounts/signup/signup.component';
import { LoginComponent } from './accounts/login/login.component';
// import { NewpageComponent } from './newpage/newpage.component';
// import { RecordsComponent } from './pages/records/records.component';
// import { DashboardComponent } from './dashboard/dashboard.component';
// import { authGuard } from './auth.guard';

export const routes: Routes = [

  {
    path: 'cas',
    loadChildren: () => 
      import('../app/newpage/layout.routes').then((m) => m.layoutRoutes),
  },
  {path: '', component: LandingpageComponent},
  // {path: 'newpage', component: NewpageComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'login', component: LoginComponent},
];
