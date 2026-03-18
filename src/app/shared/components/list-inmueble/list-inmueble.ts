import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { InmuebleImagenDTO } from '../../../core/models/dtos';
import { InmuebleService } from '../../../core/services/inmueble-service';
import { FavoritosService } from '../../../core/services/favoritos-service';
import { AuthService } from '../../../core/services/auth-service';
import { FinderData } from '../../../core/models/auxiliar';
import { Preloader } from "../preloader/preloader";
import { FichaInmueble } from "../ficha-inmueble/ficha-inmueble";
import { NoInmueble } from "../no-inmueble/no-inmueble";

@Component({
  selector: 'app-list-inmueble',
  imports: [Preloader, FichaInmueble, NoInmueble],
  templateUrl: './list-inmueble.html',
  styleUrl: './list-inmueble.css',
})
export class ListInmueble implements OnInit {

  //El objetivo de ListInmueble es albergar fichas
  //El ListInmueble puede estar en:
  //"home" ---> getInmueblesPortada (no recibo nada)
  //"finder" ---> getInmueblesFinder (recibo 3 datos: id de tipo, id de poblacion, id de operacion)
  //"inmobiliaria" ---> getInmueblesInmobiliaria (recibo id de inmobiliaria)
  //"favoritos" ---> getFavoritosDatos (recibo id de usuario registradp)

  private _inmuebleService: InmuebleService = inject(InmuebleService);
  private _favoritosService: FavoritosService = inject(FavoritosService);
  private _authService:AuthService = inject(AuthService);

  usuarioId:number | undefined;
  inmuebles = signal<Array<InmuebleImagenDTO>>([]);
  cargaCompletada = signal<boolean>(false);

  @Input() dondeEstoy:string;
  @Input() finderData:FinderData;
  @Input() idInmobiliaria: number;

  ngOnInit(): void {
    this._authService.getMe();//actualizamos la info del usuario
    this.usuarioId = this._authService.usuario()?.id; //El usuarioDTO es null si no estoy logueado

    if(this.dondeEstoy === 'home'){
      this.getInmueblesPortada();
    }
    if(this.dondeEstoy === 'finder'){
      this.getInmueblesFinder();
    }
    if(this.dondeEstoy === 'inmobiliaria'){
      this.getInmueblesInmobiliaria();
    }
    if(this.dondeEstoy === 'favoritos'){
      this.getInmueblesFavoritos();
    }
  }

  getInmueblesPortada():void{
    this._inmuebleService.getInmueblesPortada().subscribe({
      next: (datos: Array<InmuebleImagenDTO>) => {
        this.inmuebles.set(datos);
      },
      complete: () => {this.cargaCompletada.set(true)}
    });
  }

  getInmueblesFinder():void{
    this._inmuebleService.getInmueblesFinder(this.finderData.idTipo, this.finderData.idPoblacion, this.finderData.idOperacion).subscribe({
      next: (datos: Array<InmuebleImagenDTO>) => {
        this.inmuebles.set(datos);
      },
      complete: () => {this.cargaCompletada.set(true)}
    });
  }

  getInmueblesInmobiliaria():void{
    this._inmuebleService.getInmueblesInmobiliaria(this.idInmobiliaria).subscribe({
      next: (datos: Array<InmuebleImagenDTO>) => {
        this.inmuebles.set(datos);
      },
      complete: () => {this.cargaCompletada.set(true)}
    });
  }

  getInmueblesFavoritos():void{
    if(this.usuarioId){
      this._favoritosService.getFavoritosDatos(this.usuarioId).subscribe({
      next: (datos: Array<InmuebleImagenDTO>) => {
        this.inmuebles.set(datos);
      },
      complete: () => {this.cargaCompletada.set(true)}
    });
    }
  }


  
}
