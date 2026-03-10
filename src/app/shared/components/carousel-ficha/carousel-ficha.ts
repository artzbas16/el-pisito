import { Component, Input, OnInit, signal } from '@angular/core';
import { ImagenDTO, InmuebleImagenDTO } from '../../../core/models/dtos';
import { URL_BASE } from '../../../core/enviroments/globals';
import { CommonModule, NgClass } from "@angular/common";
import { GadgetNumeroImagenes } from "../gadget-numero-imagenes/gadget-numero-imagenes";

@Component({
  selector: 'app-carousel-ficha',
  imports: [NgClass, CommonModule, GadgetNumeroImagenes],
  templateUrl: './carousel-ficha.html',
  styleUrl: './carousel-ficha.css',
})
export class CarouselFicha implements OnInit{
  @Input() datos:InmuebleImagenDTO;

  imagenes = signal<Array<ImagenDTO>>([]);

  urlMedia:string=URL_BASE;

  ngOnInit(): void {
    this.imagenes.set(this.datos.imagenes);
  }
}
