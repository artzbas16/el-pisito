import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { PoblacionService } from '../../../core/services/poblacion-service';
import { ProvinciaService } from '../../../core/services/provincia-service';
import { ActivatedRoute, Router } from '@angular/router';
import { Poblacion, Provincia } from '../../../core/models/entities';
import { forkJoin, map, Subscription, switchMap } from 'rxjs';
import { Preloader } from "../../../shared/components/preloader/preloader";
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-edit-poblacion',
  imports: [Preloader, FormsModule, NgClass],
  templateUrl: './edit-poblacion.html',
  styleUrl: './edit-poblacion.css',
})
export class EditPoblacion implements OnInit, OnDestroy{
  private _poblacionService:PoblacionService=inject(PoblacionService);
  private _provinciaService:ProvinciaService=inject(ProvinciaService);
  private _router:Router=inject(Router);
  private _route:ActivatedRoute = inject(ActivatedRoute);

  cargaCompletada = signal<boolean>(false);

  poblacion:Poblacion;
  id:number;
  suscripcion:Subscription;
  aProvincias = signal<Array<Provincia>>([]);

  ngOnInit(): void {
    this.getDatos();
  }

  ngOnDestroy(): void {
    this.suscripcion.unsubscribe();
  }

  getDatos():void{
    
    this.suscripcion = this._route.paramMap.pipe(
          map(params => this.id= Number(params.get("id"))),
          switchMap( id => 
            forkJoin({
              poblacion: this._poblacionService.getPoblacion(id),
              provincias: this._provinciaService.getProvincias()
            }))
        ).subscribe({
          next: (datos) => {
            this.poblacion = datos.poblacion;
            this.aProvincias.set(datos.provincias)
            this.cargaCompletada.set(true);
          }
        });




  }/* fin getDatos */


  edit():void{

    this.poblacion.activo = Number(this.poblacion.activo);
    this.poblacion.nombre = this.poblacion.nombre.toUpperCase();

    this._poblacionService.editarPoblacion(this.poblacion).subscribe({

      next: (datos:Poblacion) => {this._router.navigate(["/admin/list-poblacion"])}

    });


  }

}
