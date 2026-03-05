import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { InmuebleImagenDTO } from '../../../core/models/dtos';
import { URL_API } from '../../../core/enviroments/globals';
import { Inmueble } from '../../../core/models/entities';

@Component({
  selector: 'app-list-inmueble',
  imports: [],
  templateUrl: './list-inmueble.html',
  styleUrl: './list-inmueble.css',
})
export class ListInmueble {
  private _http: HttpClient = inject(HttpClient);

  getInmuebles(): Observable<Array<InmuebleImagenDTO>> {
    return this._http.get<Array<InmuebleImagenDTO>>(`${URL_API}inmuebles`);
  }

  getInmueblesActivos(): Observable<Array<InmuebleImagenDTO>> {
    return this._http.get<Array<InmuebleImagenDTO>>(`${URL_API}inmuebles-activos`);
  }

  getInmueblesPortada(): Observable<Array<InmuebleImagenDTO>> {
    return this._http.get<Array<InmuebleImagenDTO>>(`${URL_API}inmuebles-portada`);
  }

  getInmueble(id: number): Observable<InmuebleImagenDTO> {
    return this._http.get<InmuebleImagenDTO>(`${URL_API}inmueble/${id}`);
  }

  addInmueble(inmueble: Inmueble): Observable<InmuebleImagenDTO> {
    return this._http.post<InmuebleImagenDTO>(`${URL_API}inmueble`, inmueble);
  }

  editarInmueble(inmueble: Inmueble): Observable<InmuebleImagenDTO> {
    return this._http.put<InmuebleImagenDTO>(`${URL_API}inmueble`, inmueble);
  }

  getInmueblesFinder(tipoId: number, poblacionId: number, operacionId: number): Observable<Array<InmuebleImagenDTO>> {
    return this._http.get<Array<InmuebleImagenDTO>>(`${URL_API}finder/${tipoId}/${poblacionId}/${operacionId}`);
  }

  getInmueblesInmobiliaria(inmobiliariaId: number): Observable<Array<InmuebleImagenDTO>> {
    return this._http.get<Array<InmuebleImagenDTO>>(`${URL_API}inmuebles-inmobiliaria/${inmobiliariaId}`);
  }
}
