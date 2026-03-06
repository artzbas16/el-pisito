import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ListInmueble } from "../../../shared/components/list-inmueble/list-inmueble";
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-inmobiliaria',
  imports: [ListInmueble],
  templateUrl: './inmobiliaria.html',
  styleUrl: './inmobiliaria.css',
})
export class Inmobiliaria implements OnInit, OnDestroy{

  private _route:ActivatedRoute = inject(ActivatedRoute);

  public idInmobiliaria:number;

  suscripcion:Subscription;

  ngOnInit(): void {
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
  }

}
