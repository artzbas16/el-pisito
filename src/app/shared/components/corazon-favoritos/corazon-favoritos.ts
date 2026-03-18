import {  Component, inject, Input, OnInit, signal } from '@angular/core';
import { AuthService } from '../../../core/services/auth-service';
import { Router, RouterLink } from "@angular/router";
import { FavoritosService } from '../../../core/services/favoritos-service';
import { InmuebleIdDTO, InmuebleImagenDTO } from '../../../core/models/dtos';
import { ModalData } from '../../../core/models/auxiliar';
import { ModalService } from '../../../core/services/modal-service';

@Component({
  selector: 'app-corazon-favoritos',
  imports: [RouterLink],
  providers:[],
  templateUrl: './corazon-favoritos.html',
  styleUrl: './corazon-favoritos.css',
})
export class CorazonFavoritos implements OnInit{

  @Input() elInmueble:InmuebleImagenDTO;

  public _authService:AuthService = inject(AuthService);
  private _favoritoService:FavoritosService = inject(FavoritosService);
  private _router:Router=inject(Router);
  private _modalService:ModalService = inject(ModalService);

  cargaCompletada = signal<boolean>(false);
  
  esFavorito=signal<boolean>(false);

  inmueble:InmuebleImagenDTO;

  inmueblesFavoritosId:Array<InmuebleIdDTO>;

  modalData:ModalData = {
    titulo:"",
    mensaje:"",
    imagen:""
  }

  ngOnInit(): void {
    if(this._authService.isLoggedIn()){
      this.getFavorito();
    }
    else{
    }
  }

  getFavorito(){
    this._favoritoService.getFavoritosId(this._authService.usuario()!.id).subscribe({
      next: (inmuebles:Array<InmuebleIdDTO>) => {
        this.inmueblesFavoritosId = inmuebles;
        this.esFavorito.set(this.inmueblesFavoritosId.some(fav => fav.id === this.elInmueble.id)); 
      },
      complete: () => {this.cargaCompletada.set(true)}
    })
  }

  deleteFavorito():void{
    if(this._authService.isLoggedIn()){
      this._favoritoService.deleteFavorito(this._authService.usuario()!.id, this.elInmueble.id).subscribe({
        next: (inmbueble:InmuebleImagenDTO) => {
          this.inmueble = inmbueble;
          this.modalData.titulo = "Inmueble eliminado a favoritos";
          this.modalData.mensaje = `El inmueble situado en la ${this.inmueble.via} ${this.inmueble.nombreVia} de ${this.inmueble.poblacion?.nombre} (${this.inmueble.poblacion.provincia?.nombre}) con un precio de ${this.inmueble.precio}€ se ha eliminado de su lista de favoritos`;
          this.modalData.imagen = "ok-modal.png";
        },
        complete: () => {
          this.esFavorito.set(false);
          this._modalService.open(this.modalData);
        }
      })
    }
    else{
      this._router.navigate(["/auth/login"]);
    }
  }

  addFavorito():void{
    //Puede ocurrir que nos logueemos "aparezcan" los botones de corazon addFavorito o deleteFavorito
    //y que estén en pantalla mientras la fecha de caducidad del token expira. Entonces, cuando
    //pulsamos estos botones no estando logueados nos daria un error que evita este if
    if(this._authService.isLoggedIn()){
      this._favoritoService.addFavorito(this._authService.usuario()!.id, this.elInmueble.id).subscribe({
        next: (inmbueble:InmuebleImagenDTO) => {
          this.inmueble = inmbueble;
          this.modalData.titulo = "Nuevo inmueble añadido a favoritos";
          this.modalData.mensaje = `El inmueble situado en la ${this.inmueble.via} ${this.inmueble.nombreVia} de ${this.inmueble.poblacion?.nombre} (${this.inmueble.poblacion.provincia?.nombre}) con un precio de ${this.inmueble.precio}€ se ha añadido a su lista de favoritos`;
          this.modalData.imagen = "ok-modal.png";

        },
        complete: () => {
          this.esFavorito.set(true); //para cambiar el corazon

          //
          this._modalService.open(this.modalData);

        }
      })
    }
    else{
      this._router.navigate(["/auth/login"]);
    }
  }

}
