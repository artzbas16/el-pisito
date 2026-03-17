import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BannerCarouselIdDTO, BannerCarouselImagenDTO } from '../models/dtos';
import { URL_API } from '../enviroments/globals';

@Injectable({
  providedIn: 'root',
})
export class TematicaBannerCarouselService {
  private _http:HttpClient = inject(HttpClient);

  //Este metodo añade un banner carousel a una tematica
  addBannerCarouselToTematica(tematicaId: number, bannerCarouselId: number): Observable<BannerCarouselImagenDTO>{
    const params = new HttpParams()
      .set('tematicaId', tematicaId)
      .set('bannerCarouselId', bannerCarouselId);
    return this._http.post<BannerCarouselImagenDTO>(`${URL_API}tematica-bannercarousel`, null, {params});
  }

  //Elimina un banner carousel de una tematica
  deleteBannerCarouseltoTematica(tematicaId: number, bannerCarouselId: number): Observable<BannerCarouselImagenDTO>{
    const params = new HttpParams()
      .set('tematicaId', tematicaId)
      .set('bannerCarouselId', bannerCarouselId);
    return this._http.delete<BannerCarouselImagenDTO>(`${URL_API}tematica-bannercarousel`, {params});
  }

  //Este metodo devuelve los banners carousel de una tematica con el id de la tematica
  getBannersCarouselTematica(id:number): Observable<Array<BannerCarouselImagenDTO>>{
    return this._http.get<Array<BannerCarouselImagenDTO>>(`${URL_API}bannerscarousel-tematica/${id}`);
  }

  getBannersCarouselIdTematica(id:number): Observable<Array<BannerCarouselIdDTO>>{
    return this._http.get<Array<BannerCarouselIdDTO>>(`${URL_API}bannerscarouselid-tematica/${id}`);
  }
}
