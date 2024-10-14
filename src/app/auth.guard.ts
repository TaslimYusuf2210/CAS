import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service'; // Adjust the path as necessary

export const authGuard = () => {
  const authService = inject(AuthService); // Inject AuthService
  const router = inject(Router); // Inject Router

  if (authService.isLoggedIn()) {
    return true; // Allow access if logged in
  }

  // Redirect to login page if not logged in
  router.navigate(['/login']);
  return false; // Block access if not logged in
};
