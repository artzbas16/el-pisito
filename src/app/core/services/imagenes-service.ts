import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ImagenDTO } from '../models/dtos';
import { URL_IMAGEN } from '../enviroments/globals';
import { Imagen } from '../models/entities';

@Injectable({
  providedIn: 'root',
})
export class ImagenesService {
  private _http:HttpClient = inject(HttpClient);
  
  upload(formData:FormData): Observable<ImagenDTO>{
    return this._http.post<ImagenDTO>(`${URL_IMAGEN}upload`, formData);

    //Cuando usamos FormData y lo enviamos a la API en un "post" no estamos enviando un
    //RequestBody "normal" a Spring, aunque tecnicamente vaya en el body HTTP.
    //la peticion que llega a la API es de tipo Content-Type: multipart, formData y esto
    //no es un JSON en el body sino un body multipart dividido en partes.
    //Cuando el objeto llega a Spring (al endpoint "/upload" en nuestro caso) trata cada
    //campo como una parte independiente, no como un unico body. Entonces en Spring recogemos
    //cada dato de manera independiente con @RequestParam
  }

  updateAltImagen(imagen:Imagen):Observable<ImagenDTO>{
    return this._http.put<ImagenDTO>(`${URL_IMAGEN}imagen`,imagen);
  }

  deleteImagen(id:number):Observable<ImagenDTO>{
    return this._http.delete<ImagenDTO>(`${URL_IMAGEN}imagen/${id}`);
  }

}
