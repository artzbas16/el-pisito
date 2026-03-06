import { inject, Injectable } from '@angular/core';
import { InmuebleImagenDTO } from '../models/dtos';
import { URL_API } from '../enviroments/globals';
import { Observable } from 'rxjs/internal/Observable';
import { Inmueble } from '../models/entities';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class InmuebleService {
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
