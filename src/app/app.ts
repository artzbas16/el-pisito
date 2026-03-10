import { AfterViewInit, Component, ElementRef, inject, OnInit, signal, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "./shared/components/header/header";
import { MenuPrincipal } from "./shared/components/menu-principal/menu-principal";
import { Footer } from "./shared/components/footer/footer";
import { AuthService } from './core/services/auth-service';

declare var bootstrap:any;

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, MenuPrincipal, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit, AfterViewInit {
  private _authService:AuthService = inject(AuthService);

  @ViewChild('generalModal') ventanaGeneralModal:ElementRef;
  
  ventanaModal:any;

  ngOnInit(): void {
    this._authService.getMe();
  }

  ngAfterViewInit(): void {
    //Creamos una instancia de Bootstrap 5 Modal
    this.ventanaModal = new bootstrap.Modal(this.ventanaGeneralModal.nativeElement);
  }

  openModal():void{
    this.ventanaModal.show();
  }
}
