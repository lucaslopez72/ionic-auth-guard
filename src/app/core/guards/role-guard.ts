import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth';

export function roleGuard(allowedRole: string): CanActivateFn {
  return () => {
    const auth = inject(AuthService);
    const router = inject(Router);
    const session = auth.currentUser();

    if (!session?.isAuthenticated) {
      return router.createUrlTree(['/login']);
    }

    if (session.role === allowedRole) {
      return true;
    }

    return router.createUrlTree([
      session.role === 'admin' ? '/admin' : '/user-dashboard'
    ]);
  };
}