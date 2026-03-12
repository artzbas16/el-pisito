import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InmobiliariaImagenDTO } from '../models/dtos';
import { URL_API } from '../enviroments/globals';
import { Inmobiliaria } from '../models/entities';

@Injectable({
  providedIn: 'root',
})
export class InmobiliariaService {
  private _http: HttpClient = inject(HttpClient);

  getInmobiliarias(): Observable<Array<InmobiliariaImagenDTO>> {
    return this._http.get<Array<InmobiliariaImagenDTO>>(`${URL_API}inmobiliarias`);
  }

  getInmobiliariasActivas(): Observable<Array<InmobiliariaImagenDTO>> {
    return this._http.get<Array<InmobiliariaImagenDTO>>(`${URL_API}inmobiliarias-activas`);
  }

  getInmueblesPortada(): Observable<Array<InmobiliariaImagenDTO>> {
    return this._http.get<Array<InmobiliariaImagenDTO>>(`${URL_API}inmuebles-portada`);
  }

  getInmobiliaria(id: number): Observable<InmobiliariaImagenDTO> {
    return this._http.get<InmobiliariaImagenDTO>(`${URL_API}inmobiliaria/${id}`);
  }

  addInmobiliaria(inmobiliaria: Inmobiliaria): Observable<InmobiliariaImagenDTO> {
    return this._http.post<InmobiliariaImagenDTO>(`${URL_API}inmobiliaria`, inmobiliaria);
  }

  editarInmueble(inmobiliaria: Inmobiliaria): Observable<InmobiliariaImagenDTO> {
    return this._http.put<InmobiliariaImagenDTO>(`${URL_API}inmobiliaria`, inmobiliaria);
  }
  
}
