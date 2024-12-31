import { CanActivateFn, NavigationExtras, Router } from '@angular/router';
import { AuthService } from '../services/auth-service/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if(authService.hasValidToken())
  {
    return true;
  }
  return false;
};
