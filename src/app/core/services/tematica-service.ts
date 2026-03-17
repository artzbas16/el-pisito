import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { URL_API } from '../enviroments/globals';
import { Tematica } from '../models/entities';

@Injectable({
  providedIn: 'root',
})
export class TematicaService {
    private _http: HttpClient = inject(HttpClient);

  getTematicas(): Observable<Array<Tematica>> {
    return this._http.get<Array<Tematica>>(`${URL_API}tematicas`);
  }

  getTematicasActivas(): Observable<Array<Tematica>> {
    return this._http.get<Array<Tematica>>(`${URL_API}tematicas-activas`);
  }

  getTematica(id: number): Observable<Tematica> {
    return this._http.get<Tematica>(`${URL_API}tematica/${id}`);
  }

  addTematica(tematica: Tematica): Observable<Tematica> {
    return this._http.post<Tematica>(`${URL_API}tematica`, tematica);
  }

  editarTematica(tematica: Tematica): Observable<Tematica> {
    return this._http.put<Tematica>(`${URL_API}tematica`, tematica);
  }

  actualizarTematica(id: number): Observable<Tematica> {
    return this._http.put<Tematica>(`${URL_API}actualizar-tematica`, id);
  }

  getTematicaActual(): Observable<Tematica> {
    return this._http.get<Tematica>(`${URL_API}tematica-actual`);
  }

}
