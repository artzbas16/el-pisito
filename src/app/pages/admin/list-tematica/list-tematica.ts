import { Component, inject, signal } from '@angular/core';
import { Preloader } from "../../../shared/components/preloader/preloader";
import { TematicaService } from '../../../core/services/tematica-service';
import { Tematica } from '../../../core/models/entities';
import { TematicaBannerCarouselService } from '../../../core/services/tematica-banner-carousel-service';
import { BannerCarouselImagenDTO } from '../../../core/models/dtos';
import { NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-list-tematica',
  imports: [Preloader, NgClass, RouterLink],
  templateUrl: './list-tematica.html',
  styleUrl: './list-tematica.css',
})
export class ListTematica {

  private _tematicaService:TematicaService = inject(TematicaService);
  private _tematicaBannerCarouselService:TematicaBannerCarouselService = inject(TematicaBannerCarouselService);


  datos = signal<Array<Tematica>>([]);

  cargaCompletada = signal<boolean>(false);

  ngOnInit(): void {

    this.getDatos();
  }



  getDatos():void{

    this._tematicaService.getTematicas().subscribe({

      next: (datos:Array<Tematica>) => {
        this.datos.set(datos);

        for(let laTematica of this.datos()){

            this._tematicaBannerCarouselService.getBannersCarouselTematica(laTematica.id!).subscribe({

              next:(datos:Array<BannerCarouselImagenDTO>)=>{
                laTematica.nBanners = datos.length;//dejamos en cada objeto tematica el número de banners que tiene
              }

            })

        }
      },
      complete: () => {this.cargaCompletada.set(true)}
    });

  }
}
