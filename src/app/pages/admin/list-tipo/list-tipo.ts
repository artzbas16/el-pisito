import { Component, inject, OnInit, signal } from '@angular/core';
import { TipoService } from '../../../core/services/tipo-service';
import { Tipo } from '../../../core/models/entities';
import { Preloader } from "../../../shared/components/preloader/preloader";
import { NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-list-tipo',
  imports: [Preloader, NgClass, RouterLink],
  templateUrl: './list-tipo.html',
  styleUrl: './list-tipo.css',
})
export class ListTipo implements OnInit{
  private _tipoService:TipoService = inject(TipoService);

  cargaCompletada = signal<boolean>(false);

  aDatos = signal<Array<Tipo>>([]);

  ngOnInit(): void {

    this.getDatos();
  }

  getDatos():void{

    this._tipoService.getTipos().subscribe({

      next: (datos) => {this.aDatos.set(datos)}
      ,
      complete: () => { this.cargaCompletada.set(true)}
    });



  }

}
