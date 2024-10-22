import { Routes } from '@angular/router';
import { LandingpageComponent } from './landingpage/landingpage.component';

export const routes: Routes = [

  {
    path: 'cas',
    loadChildren: () => 
      import('../app/newpage/layout.routes').then((m) => m.layoutRoutes),
  },
  {path: '', component: LandingpageComponent},
];
