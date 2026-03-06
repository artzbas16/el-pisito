import { Component, inject } from '@angular/core';
import { InmuebleImagenDTO } from '../../../core/models/dtos';
import { URL_API } from '../../../core/enviroments/globals';
import { Observable } from 'rxjs/internal/Observable';
import { Inmueble } from '../../../core/models/entities';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-list-inmueble',
  imports: [],
  templateUrl: './list-inmueble.html',
  styleUrl: './list-inmueble.css',
})
export class ListInmueble {
  
}
