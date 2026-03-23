import { Component, inject, signal } from '@angular/core';
import { OperacionService } from '../../../core/services/operacion-service';
import { Operacion } from '../../../core/models/entities';
import { Preloader } from "../../../shared/components/preloader/preloader";
import { NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-list-operacion',
  imports: [Preloader, NgClass, RouterLink],
  templateUrl: './list-operacion.html',
  styleUrl: './list-operacion.css',
})
export class ListOperacion {
  private _operacionService:OperacionService = inject(OperacionService);

  aDatos = signal<Array<Operacion>>([]);
  cargaCompletada = signal<boolean>(false);

  ngOnInit(): void {

    this.getDatos();
  }



  getDatos():void{

    this._operacionService.getOperaciones().subscribe({

      next: (datos) => {this.aDatos.set(datos)}
      ,
      complete: () => { this.cargaCompletada.set(true)}
    });



  }

}
