import { Component, inject, Input } from '@angular/core';
import { AuthService } from '../../../core/services/auth-service';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-boton-admin',
  imports: [RouterLink],
  templateUrl: './boton-admin.html',
  styleUrl: './boton-admin.css',
})
export class BotonAdmin {
  @Input() idInmueble:number;

  public _authService:AuthService = inject(AuthService);
}
