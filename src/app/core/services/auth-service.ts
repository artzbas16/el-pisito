import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Credenciales, CredencialesRespuesta } from '../models/dtos';
import { Observable } from 'rxjs';
import { URL_AUTH } from '../enviroments/globals';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _http:HttpClient = inject(HttpClient);

  login(datos:Credenciales):Observable<CredencialesRespuesta>{
    return this._http.post<CredencialesRespuesta>(`${URL_AUTH}login`, datos);
  }

}
