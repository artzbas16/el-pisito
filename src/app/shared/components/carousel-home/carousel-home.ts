import { Component, inject, OnInit, signal } from '@angular/core';
import { TematicaBannerCarouselService } from '../../../core/services/tematica-banner-carousel-service';
import { TematicaService } from '../../../core/services/tematica-service';
import { switchMap } from 'rxjs';
import { Tematica } from '../../../core/models/entities';
import { BannerCarouselImagenDTO } from '../../../core/models/dtos';
import { Preloader } from "../preloader/preloader";
import { NgClass } from '@angular/common';
import { URL_MEDIA } from '../../../core/enviroments/globals';

@Component({
  selector: 'app-carousel-home',
  imports: [Preloader, NgClass],
  templateUrl: './carousel-home.html',
  styleUrl: './carousel-home.css',
})
export class CarouselHome implements OnInit{
  private _tematicaBannerCarouselService:TematicaBannerCarouselService = inject(TematicaBannerCarouselService);
  private _tematicaService:TematicaService = inject(TematicaService);

  tematicaId:number;
  bannersCarousel = signal<Array<BannerCarouselImagenDTO>>([]);

  cargaCompletada = signal<boolean>(false);

  urlMedia = URL_MEDIA;

  ngOnInit(): void {
    this.getDatos();
  }

  getDatos():void{
    this._tematicaService.getTematicaActual().pipe(
      switchMap((datos:Tematica) => {
        this.tematicaId = datos.id!;
        return this._tematicaBannerCarouselService.getBannersCarouselTematica(this.tematicaId);
      })
    ).subscribe({
      next: (datos:Array<BannerCarouselImagenDTO>) => {
        this.bannersCarousel.set(datos);
      },
      complete: () => this.cargaCompletada.set(true)
    });
  }
}
