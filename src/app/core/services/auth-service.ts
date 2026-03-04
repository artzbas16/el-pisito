import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Credenciales, CredencialesRespuesta, UsuarioDTO } from '../models/dtos';
import { URL_API, URL_AUTH } from '../enviroments/globals';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _http:HttpClient = inject(HttpClient);

  isLoggedIn = signal<boolean>(false);
  usuario = signal<UsuarioDTO | null>(null);
  //"Todavia no se si el usuario esta logueado o no". Todavia no hemos llamado a getMe
  //En esta ocasion la vamos a utilizar en el menu principal para evitar un efecto que se 
  //llama "flicker visual" (en el caso de estar logueados vamos a ver durante una decima 
  // de segundo el menu como si no estuvieramos logueados)
  loading = signal<boolean>(true); 

  private _router:Router = inject(Router);

  login(datos:Credenciales):void{
    this._http.post<UsuarioDTO>(`${URL_AUTH}login`, datos).subscribe({
      next: (u:UsuarioDTO) => {
        this.usuario.set(u);
        this.isLoggedIn.set(true);
        this.loading.set(false);
      },
      complete: () => {this._router.navigate(["/"])}
    });
  }

  logout():void{
    this._http.get<CredencialesRespuesta>(`${URL_AUTH}logout`).subscribe({
      next: (cr:CredencialesRespuesta) => {
        this.usuario.set(null);
        this.isLoggedIn.set(false);
      }
    });
  }

  getMe():void{
    this._http.get<UsuarioDTO>(`${URL_API}me`).subscribe({
      next: (u:UsuarioDTO) => {
        if(u.id){
          this.usuario.set(u);
          this.isLoggedIn.set(true);
          this.loading.set(false);
        }
        else{
          this.usuario.set(null);
          this.isLoggedIn.set(false);
          this.loading.set(false);
        }
      }
    });
  }

}
