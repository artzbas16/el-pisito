import { Component, inject, signal } from '@angular/core';
import { ProvinciaService } from '../../../core/services/provincia-service';
import { Router, RouterLink } from '@angular/router';
import { Provincia } from '../../../core/models/entities';
import { Preloader } from "../../../shared/components/preloader/preloader";
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-list-provincia',
  imports: [Preloader, NgClass, RouterLink],
  templateUrl: './list-provincia.html',
  styleUrl: './list-provincia.css',
})
export class ListProvincia {

  private _provinciaService:ProvinciaService = inject(ProvinciaService);
  private _router:Router = inject(Router);

  cargaCompletada = signal<boolean>(false);

  aDatos = signal<Array<Provincia>>([]);

  ngOnInit(): void {
    this.getDatos();
  }


  getDatos():void{

    this._provinciaService.getProvincias().subscribe({

      next: (datos) => {this.aDatos.set(datos)}
      ,
      complete: () => { this.cargaCompletada.set(true)}
    });


  }

}
