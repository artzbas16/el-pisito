import { AfterViewInit, Component, effect, ElementRef, inject, OnInit, signal, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "./shared/components/header/header";
import { MenuPrincipal } from "./shared/components/menu-principal/menu-principal";
import { Footer } from "./shared/components/footer/footer";
import { AuthService } from './core/services/auth-service';
import { ModalService } from './core/services/modal-service';
import { ModalData } from './core/models/auxiliar';

declare var bootstrap:any;

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, MenuPrincipal, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit, AfterViewInit {

  private _authService:AuthService = inject(AuthService);
  public _modalService:ModalService = inject(ModalService);

  @ViewChild('generalModal') ventanaGeneralModal:ElementRef;
  
  ventanaModal:any;

  // titulo:string;
  // mensaje:string;
  // imagen:string;
  // accion:string;

  // acciones = {
  //   openModal: () => this.ventanaModal?.show()
  // }

  constructor(){
    effect(() => {
      const abierto:boolean = this._modalService.isOpen();

      if(!this.ventanaModal) return;

      if(abierto){
        this.ventanaModal.show();
      }else{
        this.ventanaModal.hide();
      }
    });
  }

  ngOnInit(): void {
    this._authService.getMe();
  }

  ngAfterViewInit(): void {

    // instancia modal bootstrap
    this.ventanaModal = new bootstrap.Modal(this.ventanaGeneralModal.nativeElement);

    // evento cierre modal
    this.ventanaGeneralModal.nativeElement.addEventListener(
      'hidden.bs.modal',
      () => {
        this._modalService.close();
      }
    );

  }


}
