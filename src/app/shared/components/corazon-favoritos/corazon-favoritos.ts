import {  Component, inject, Input, OnInit, signal } from '@angular/core';
import { AuthService } from '../../../core/services/auth-service';
import { Router, RouterLink } from "@angular/router";
import { FavoritosService } from '../../../core/services/favoritos-service';
import { InmuebleIdDTO, InmuebleImagenDTO } from '../../../core/models/dtos';
import { ControlCargaService } from '../../../core/services/control-carga-service';

@Component({
  selector: 'app-corazon-favoritos',
  imports: [RouterLink],
  providers:[ControlCargaService],
  templateUrl: './corazon-favoritos.html',
  styleUrl: './corazon-favoritos.css',
})
export class CorazonFavoritos implements OnInit{

  @Input() elInmueble:InmuebleImagenDTO;

  public _authService:AuthService = inject(AuthService);

  esFavorito=signal<boolean>(false);

  private _favoritoService:FavoritosService = inject(FavoritosService);

  inmueble:InmuebleImagenDTO;

  inmueblesFavoritosId:Array<InmuebleIdDTO>;

  public _controlCargaService:ControlCargaService = inject(ControlCargaService);

  private _router:Router=inject(Router);

  ngOnInit(): void {
    this._controlCargaService.nFases.set(1);
    if(this._authService.isLoggedIn()){
      this.getFavorito();
    }
    else{
      this._controlCargaService.faseCarga();
    }
  }

  getFavorito(){
    this._favoritoService.getFavoritosId(this._authService.usuario()!.id).subscribe({
      next: (inmuebles:Array<InmuebleIdDTO>) => {
        this.inmueblesFavoritosId = inmuebles;
        this.esFavorito.set(this.inmueblesFavoritosId.some(fav => fav.id === this.elInmueble.id)); 
      },
      complete: () => {this._controlCargaService.faseCarga()}
    })
  }

  deleteFavorito():void{
    if(this._authService.isLoggedIn()){
      this._favoritoService.deleteFavorito(this._authService.usuario()!.id, this.elInmueble.id).subscribe({
        next: (inmbueble:InmuebleImagenDTO) => {this.inmueble = inmbueble},
        complete: () => {this.esFavorito.set(false)}
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
        next: (inmbueble:InmuebleImagenDTO) => {this.inmueble = inmbueble},
        complete: () => {
          this.esFavorito.set(true);
        }
      })
    }
    else{
      this._router.navigate(["/auth/login"]);
    }
  }

}
