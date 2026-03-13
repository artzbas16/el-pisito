import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { URL_API } from '../enviroments/globals';
import { BannerIdDTO, BannerImagenDTO } from '../models/dtos';

@Injectable({
  providedIn: 'root',
})
export class PaginaBannerService {
  private _http:HttpClient = inject(HttpClient);

  //Este metodo añade un banner a una página
  addBannerPagina(paginaId: number, bannerId: number): Observable<BannerImagenDTO>{
    const params = new HttpParams()
      .set('paginaId', paginaId)
      .set('bannerId', bannerId);
    return this._http.post<BannerImagenDTO>(`${URL_API}pagina-banner`, null, {params});
  }

  //Elimina un banner de una página
  deleteBannerPagina(paginaId: number, bannerId: number): Observable<BannerImagenDTO>{
    const params = new HttpParams()
      .set('paginaId', paginaId)
      .set('bannerId', bannerId);
    return this._http.delete<BannerImagenDTO>(`${URL_API}pagina-banner`, {params});
  }

  //Este metodo devuelve los banners de una pagina con el id de la pagina
  getBannersPagina(paginaId:number): Observable<Array<BannerImagenDTO>>{
    return this._http.get<Array<BannerImagenDTO>>(`${URL_API}banners-pagina/${paginaId}`);
  }

  getBannersIdPagina(paginaId:number): Observable<Array<BannerIdDTO>>{
    return this._http.get<Array<BannerIdDTO>>(`${URL_API}bannersid-pagina/${paginaId}`);
  }
}
