import { Component, inject } from '@angular/core';
import { RouterLink } from "@angular/router";
import { AuthService } from '../../../core/services/auth-service';

@Component({
  selector: 'app-menu-principal',
  imports: [RouterLink],
  templateUrl: './menu-principal.html',
  styleUrl: './menu-principal.css',
})
export class MenuPrincipal {

  // app inicia --> _authService.getMe() --> GET /me (cookie HttpOnly a API)
  // --> API valida token --> signal isLoggedIn = true o false y signal loading se pone false 
  // --> 
  public _authService:AuthService = inject(AuthService);

  logout():void{
    this._authService.logout();
  }

}
