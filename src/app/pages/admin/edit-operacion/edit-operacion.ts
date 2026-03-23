import { Component, inject, signal } from '@angular/core';
import { OperacionService } from '../../../core/services/operacion-service';
import { ActivatedRoute, Router } from '@angular/router';
import { Operacion } from '../../../core/models/entities';
import { map, Subscription, switchMap } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { Preloader } from "../../../shared/components/preloader/preloader";

@Component({
  selector: 'app-edit-operacion',
  imports: [FormsModule, Preloader],
  templateUrl: './edit-operacion.html',
  styleUrl: './edit-operacion.css',
})
export class EditOperacion {
  private _operacionService:OperacionService=inject(OperacionService);
  private _router:Router=inject(Router);
  private _route:ActivatedRoute = inject(ActivatedRoute);

  cargaCompletada = signal<boolean>(false);

  operacion:Operacion;
  id:number;
  suscripcion:Subscription;

  ngOnInit(): void {
    this.getDatos();
  }

  ngOnDestroy(): void {
    this.suscripcion.unsubscribe();
  }

  getDatos():void{

    this.suscripcion = this._route.paramMap.pipe(
              map(params => this.id= Number(params.get("id"))),
              switchMap( id => this._operacionService.getOperacion(id))
        
            ).subscribe({
              next: (datos:Operacion) => {
                this.operacion = datos;
                this.cargaCompletada.set(true);
              }
        
            });
  }


  edit():void{

    this.operacion.activo = Number(this.operacion.activo);
    this.operacion.nombre = this.operacion.nombre.toUpperCase();

    this._operacionService.editarOperacion(this.operacion).subscribe({

      next: (datos) => {this._router.navigate(["/admin/list-operacion"])}

    });




  }

}
