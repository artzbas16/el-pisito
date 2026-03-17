import { Component, Input, signal } from '@angular/core';
import { BannerImagenDTO, ImagenDTO } from '../../../core/models/dtos';
import { URL_BASE } from '../../../core/enviroments/globals';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-banner',
  imports: [RouterLink],
  templateUrl: './banner.html',
  styleUrl: './banner.css',
})
export class Banner {
  @Input() datos:BannerImagenDTO;

  imagenes = signal<Array<ImagenDTO>>([]);

  urlMedia:string=URL_BASE;

  ngOnInit(): void {
    this.imagenes.set(this.datos.imagenes);
  }


}
