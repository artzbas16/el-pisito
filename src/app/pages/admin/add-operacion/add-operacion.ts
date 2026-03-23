import { Component, inject } from '@angular/core';
import { OperacionService } from '../../../core/services/operacion-service';
import { Operacion } from '../../../core/models/entities';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-operacion',
  imports: [FormsModule],
  templateUrl: './add-operacion.html',
  styleUrl: './add-operacion.css',
})
export class AddOperacion {

  private _operacionService:OperacionService = inject(OperacionService);
  private _router:Router = inject(Router);

  operacion:Operacion={

    nombre:""

  }


  add():void{

    this.operacion.nombre = this.operacion.nombre.toUpperCase();

    this._operacionService.addOperacion(this.operacion).subscribe({

      next: (datos) => {this._router.navigate(["/admin/list-operacion"])}
    });


  }


}
