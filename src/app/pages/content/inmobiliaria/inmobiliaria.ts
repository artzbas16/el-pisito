import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ListInmueble } from "../../../shared/components/list-inmueble/list-inmueble";
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { InmobiliariaService } from '../../../core/services/inmobiliaria-service';
import { InmobiliariaImagenDTO } from '../../../core/models/dtos';
import { ControlCargaService } from '../../../core/services/control-carga-service';
import { Preloader } from "../../../shared/components/preloader/preloader";
import { URL_MEDIA } from '../../../core/enviroments/globals';

@Component({
  selector: 'app-inmobiliaria',
  imports: [ListInmueble, Preloader],
  providers: [ControlCargaService],
  templateUrl: './inmobiliaria.html',
  styleUrl: './inmobiliaria.css',
})
export class Inmobiliaria implements OnInit, OnDestroy{

  private _route:ActivatedRoute = inject(ActivatedRoute);
  private _inmobiliariaService:InmobiliariaService = inject(InmobiliariaService);
  public _controlCargaService:ControlCargaService = inject(ControlCargaService);

  public idInmobiliaria:number;

  inmobiliaria:InmobiliariaImagenDTO;

  suscripcion:Subscription;

  url:string;

  ngOnInit(): void {
    this._controlCargaService.nFases.set(1);
    this.getDatos();
  }

  ngOnDestroy(): void {
    this.suscripcion.unsubscribe();
  }

  getDatos():void{

    //Observable de tipo Hot
    this.suscripcion = this._route.params.subscribe({
      next: (params) => {
        this.idInmobiliaria = params["id"];
      }
    })

    this._inmobiliariaService.getInmobiliaria(this.idInmobiliaria).subscribe({
      next: (datos:InmobiliariaImagenDTO) => {
        this.inmobiliaria = datos;
        this.url = `${URL_MEDIA}${this.inmobiliaria.imagenes[0].url}`;
      },
      complete: () => {this._controlCargaService.faseCarga()}
    })

  }

}
