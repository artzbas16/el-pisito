import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { ListInmueble } from "../../../shared/components/list-inmueble/list-inmueble";
import { ActivatedRoute } from '@angular/router';
import { map, Subscription, switchMap } from 'rxjs';
import { InmobiliariaService } from '../../../core/services/inmobiliaria-service';
import { InmobiliariaImagenDTO } from '../../../core/models/dtos';
import { Preloader } from "../../../shared/components/preloader/preloader";
import { URL_MEDIA } from '../../../core/enviroments/globals';
import { ContenedorBanners } from "../../../shared/components/contenedor-banners/contenedor-banners";

@Component({
  selector: 'app-inmobiliaria',
  imports: [ListInmueble, Preloader, ContenedorBanners],
  templateUrl: './inmobiliaria.html',
  styleUrl: './inmobiliaria.css',
})
export class Inmobiliaria implements OnInit, OnDestroy{

  private _route:ActivatedRoute = inject(ActivatedRoute);
  private _inmobiliariaService:InmobiliariaService = inject(InmobiliariaService);

  cargaCompletada = signal<boolean>(false);

  public idInmobiliaria:number;

  inmobiliaria:InmobiliariaImagenDTO;

  suscripcion:Subscription;

  url:string;

  ngOnInit(): void {
    this.getDatos();
  }

  ngOnDestroy(): void {
    this.suscripcion.unsubscribe();
  }

  getDatos():void{
    //Este patron es el mas recomendable cuando se trata de extraer parametros de la URL
    this.suscripcion = this._route.paramMap.pipe(
      map(params => this.idInmobiliaria = Number(params.get("id"))), //Extrae id de la ruta

      switchMap( //hace la llamada a la api usando ese id
        id => this._inmobiliariaService.getInmobiliaria(this.idInmobiliaria))
    ).subscribe({
      next: (datos:InmobiliariaImagenDTO) => {
        this.inmobiliaria = datos;
        this.url = `${URL_MEDIA}${this.inmobiliaria.imagenes[0].url}`;
        this.cargaCompletada.set(true);
      },
      complete: () => {}
    });


    //Observable de tipo Hot
    // this.suscripcion = this._route.params.subscribe({
    //   next: (params) => {
    //     this.idInmobiliaria = params["id"];
    //   }
    // })

    // this._inmobiliariaService.getInmobiliaria(this.idInmobiliaria).subscribe({
    //   next: (datos:InmobiliariaImagenDTO) => {
    //     this.inmobiliaria = datos;
    //     this.url = `${URL_MEDIA}${this.inmobiliaria.imagenes[0].url}`;
    //   },
    //   complete: () => {this._controlCargaService.faseCarga()}
    // })

  }

}
