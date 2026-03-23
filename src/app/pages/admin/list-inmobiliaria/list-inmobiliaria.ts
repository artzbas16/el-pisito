import { Component, inject, signal } from '@angular/core';
import { InmobiliariaService } from '../../../core/services/inmobiliaria-service';
import { RouterLink } from '@angular/router';
import { InmobiliariaImagenDTO } from '../../../core/models/dtos';
import { NgClass } from '@angular/common';
import { Preloader } from "../../../shared/components/preloader/preloader";
import { URL_MEDIA } from '../../../core/enviroments/globals';

@Component({
  selector: 'app-list-inmobiliaria',
  imports: [NgClass, Preloader, RouterLink],
  templateUrl: './list-inmobiliaria.html',
  styleUrl: './list-inmobiliaria.css',
})
export class ListInmobiliaria {

  private _inmobiliariaService:InmobiliariaService = inject(InmobiliariaService);

  aDatos= signal<Array<InmobiliariaImagenDTO>>([]);
  cargaCompletada = signal<boolean>(false);

  url:string = URL_MEDIA;
  ngOnInit(): void {

    this.getDatos();
  }



  getDatos():void{

    this._inmobiliariaService.getInmobiliarias().subscribe({

      next: (datos) => {this.aDatos.set(datos)},
      complete: () => { this.cargaCompletada.set(true)}
    });



  }


}
