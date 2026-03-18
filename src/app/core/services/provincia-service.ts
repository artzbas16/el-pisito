import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { URL_API } from '../enviroments/globals';
import { Provincia } from '../models/entities';

@Injectable({
  providedIn: 'root',
})
export class ProvinciaService {
    private _http: HttpClient = inject(HttpClient);

  getProvincias(): Observable<Array<Provincia>> {
    return this._http.get<Array<Provincia>>(`${URL_API}provincias`);
  }

  getProvinciasActivas(): Observable<Array<Provincia>> {
    return this._http.get<Array<Provincia>>(`${URL_API}provincias-activas`);
  }

  getProvincia(id: number): Observable<Provincia> {
    return this._http.get<Provincia>(`${URL_API}provincia/${id}`);
  }

  addProvincia(provincia: Provincia): Observable<Provincia> {
    return this._http.post<Provincia>(`${URL_API}provincia`, provincia);
  }

  editarProvincia(provincia: Provincia): Observable<Provincia> {
    return this._http.put<Provincia>(`${URL_API}provincia`, provincia);
  }
}
