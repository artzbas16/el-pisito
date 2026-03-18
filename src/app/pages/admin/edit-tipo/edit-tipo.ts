import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { TipoService } from '../../../core/services/tipo-service';
import { ActivatedRoute, Router } from '@angular/router';
import { Tipo } from '../../../core/models/entities';
import { map, Subscription, switchMap } from 'rxjs';
import { Preloader } from "../../../shared/components/preloader/preloader";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-tipo',
  imports: [Preloader, FormsModule],
  templateUrl: './edit-tipo.html',
  styleUrl: './edit-tipo.css',
})
export class EditTipo implements OnInit, OnDestroy{
  private _tipoService:TipoService=inject(TipoService);
  private _route:ActivatedRoute = inject(ActivatedRoute);
  private _router:Router=inject(Router)

  tipo:Tipo;
  id:number;
  suscripcion:Subscription;

  cargaCompletada = signal<boolean>(false);

  ngOnInit(): void {
    this.getDatos();
  }

  ngOnDestroy(): void {
    this.suscripcion.unsubscribe();
  }

  getDatos():void{

    //conseguimos el id de la ruta (Observable hot)
    this.suscripcion = this._route.paramMap.pipe(
      map(params => this.id= Number(params.get("id"))),
      switchMap( id => this._tipoService.getTipo(id))

    ).subscribe({
      next: (datos:Tipo) => {
        this.tipo = datos;
        this.cargaCompletada.set(true);
      }

    });

  }


  edit():void{

    this.tipo.activo = Number(this.tipo.activo);
    this.tipo.nombre = this.tipo.nombre.toUpperCase();

    this._tipoService.editarTipo(this.tipo).subscribe({

      next: (datos) => {}
      ,
      complete: () => {this._router.navigate(["/admin/list-tipo"])}

    });




  }

}
