import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from './auth.service'; // Adjust the path as necessary
import { LandingpageComponent } from './landingpage/landingpage.component';

export const authGuard:CanActivateFn = (route, state) => {
  const authService = inject(AuthService); // Inject AuthService
  const router = inject(Router); // Inject Router
  console.log(authService.isLoggedIn)

  if (authService.isLoggedIn) {
    return true; // Allow access if logged in
  }

  // Redirect to login page if not logged in
  router.navigate(['']);
  return false; // Block access if not logged in
};
