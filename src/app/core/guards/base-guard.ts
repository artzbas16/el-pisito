import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth-service';
import { inject } from '@angular/core/primitives/di';

//Se ocupa de mirar si estoy loggeado o no
export const baseGuard: CanActivateFn = (route, state) => {

  let _authService = inject(AuthService);
  let _router = inject(Router);

  if (_authService.isLoggedIn()) {

    return true;
    
  }else {

    _router.navigate(['/auth/login']);
    return false;
    
  }
  
};
