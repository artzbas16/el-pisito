import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InmuebleIdDTO, InmuebleImagenDTO } from '../models/dtos';
import { URL_API } from '../enviroments/globals';

@Injectable({
  providedIn: 'root',
})
export class FavoritosService {

  private _http:HttpClient = inject(HttpClient);

  addFavorito(usuarioId: number, inmuebleId: number): Observable<InmuebleImagenDTO>{
    const params = new HttpParams()
      .set('usuarioId', usuarioId)
      .set('inmuebleId', inmuebleId);
    return this._http.post<InmuebleImagenDTO>(`${URL_API}favorito`, null, {params});
  }

  deleteFavorito(usuarioId: number, inmuebleId: number): Observable<InmuebleImagenDTO>{
    const params = new HttpParams()
      .set('usuarioId', usuarioId)
      .set('inmuebleId', inmuebleId);
    return this._http.delete<InmuebleImagenDTO>(`${URL_API}favorito`, {params});
  }

  //este metodo devuelve los InmuebleImagenDTO favoritos de un usuario
  getFavoritosDatos(id: number):Observable<Array<InmuebleImagenDTO>>{
    return this._http.get<Array<InmuebleImagenDTO>>(`${URL_API}favoritos-usuario/${id}`);
  }

  getFavoritosId(id: number):Observable<Array<InmuebleIdDTO>>{
    return this._http.get<Array<InmuebleIdDTO>>(`${URL_API}favoritosid-usuario/${id}`);
  }
  
}
