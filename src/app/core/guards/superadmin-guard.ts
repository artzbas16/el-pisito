import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth-service';
import { ErrorStoreService } from '../services/error-store-service';

export const superadminGuard: CanActivateFn = (route, state) => {
  let _authService = inject(AuthService);
  let _router = inject(Router);
  let _errorStoreService = inject(ErrorStoreService);

  if (_authService.usuario()?.rol === 'ROLE_SUPERADMIN') {

    return true;
    
  }else {

    _errorStoreService.errorStatus.set(403);
    _errorStoreService.errorMensaje.set('No tienes permiso para acceder a esta página');
    _router.navigate(['/error']);
    return false;
    
  }
};
