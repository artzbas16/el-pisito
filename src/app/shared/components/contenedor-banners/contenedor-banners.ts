import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { ControlCargaService } from '../../../core/services/control-carga-service';
import { PaginaBannerService } from '../../../core/services/pagina-banner-service';
import { PaginaService } from '../../../core/services/pagina-service';
import { Pagina } from '../../../core/models/entities';
import { BannerImagenDTO } from '../../../core/models/dtos';
import { switchMap } from 'rxjs';
import { Preloader } from "../preloader/preloader";
import { Banner } from "../banner/banner";

@Component({
  selector: 'app-contenedor-banners',
  imports: [Preloader, Banner],
  providers: [ControlCargaService],
  templateUrl: './contenedor-banners.html',
  styleUrl: './contenedor-banners.css',
})
export class ContenedorBanners implements OnInit{
  //dondeEstoy 
  @Input() dondeEstoy:string;

  public _controlCargaService:ControlCargaService = inject(ControlCargaService);
  private _paginaBannerService:PaginaBannerService = inject(PaginaBannerService);
  private _paginaService:PaginaService = inject(PaginaService);

  paginaId:number;
  banners = signal<Array<BannerImagenDTO>>([]);

  ngOnInit(): void {
    this._controlCargaService.nFases.set(1);
    this.getDatos(); 
  }

  getDatos(){

    this._paginaService.getPaginaNombre(this.dondeEstoy).pipe(
      switchMap((datos:Pagina) => {
        this.paginaId = datos.id!; 
        return this._paginaBannerService.getBannersPagina(this.paginaId);
      })
    ).subscribe({
      next: (datos:Array<BannerImagenDTO>) => {this.banners.set(datos);},
      complete: () => {this._controlCargaService.faseCarga();}
    });

    /*
    this._paginaService.getPaginaNombre(this.dondeEstoy).subscribe({
      next: (datos:Pagina) => {this.paginaId = datos.id!;},
      complete: () => {
        this._paginaBannerService.getBannersPagina(this.paginaId).subscribe({
          next: (datos:Array<BannerImagenDTO>) => {this.banners = datos;},
          complete: () => {this._controlCargaService.faseCarga();}
        });
        this._controlCargaService.faseCarga();
      }
    });
    */
  }

}
