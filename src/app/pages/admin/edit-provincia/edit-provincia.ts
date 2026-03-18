import { Component, inject, signal } from '@angular/core';
import { Preloader } from "../../../shared/components/preloader/preloader";
import { ProvinciaService } from '../../../core/services/provincia-service';
import { ActivatedRoute, Router } from '@angular/router';
import { Provincia } from '../../../core/models/entities';
import { map, Subscription, switchMap } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-provincia',
  imports: [Preloader, FormsModule],
  templateUrl: './edit-provincia.html',
  styleUrl: './edit-provincia.css',
})
export class EditProvincia {

  private _provinciaService:ProvinciaService=inject(ProvinciaService);
  private _router:Router=inject(Router);
  private _route:ActivatedRoute = inject(ActivatedRoute);

  provincia:Provincia;
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
    this.suscripcion = this._route.paramMap.pipe(
          map(params => this.id= Number(params.get("id"))),
          switchMap( id => this._provinciaService.getProvincia(id))
    
        ).subscribe({
          next: (datos:Provincia) => {
            this.provincia = datos;
            this.cargaCompletada.set(true);
          }
    
        });
  }


  edit():void{

    this.provincia.activo = Number(this.provincia.activo);
    this.provincia.nombre = this.provincia.nombre.toUpperCase();

    this._provinciaService.editarProvincia(this.provincia).subscribe({

      next: (datos) => {this._router.navigate(["/admin/list-provincia"])}

    });




  }


}
