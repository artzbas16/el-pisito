import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, pipe, throwError } from 'rxjs';
import { ErrorStoreService } from '../services/error-store-service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth-service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {

  let _errorStoreService = inject(ErrorStoreService);
  let _router = inject(Router);
  let _authService = inject(AuthService);

  return next(req).pipe(

    catchError((err:HttpErrorResponse) => {

      console.log(err);

      if(err.error.status == 401){
        _authService.resetEstado();
      }

      //Aqui podemos checkear si el objeto err tiene un atributo "mensaje"
      if(err.error.mensaje){//es un mensajeDTO
        _errorStoreService.setErrorStatus(err.error.status);
        _errorStoreService.setErrorMensaje(err.error.mensaje);
      }
      else{// es error de Spring Security
        _errorStoreService.setErrorStatus(err.error.status);
        _errorStoreService.setErrorMensaje(err.error.message);
      }
      
      

      _router.navigate(['/error']);
      return throwError(() => err);
      
    })
  );
};

/*
EJEMPLO DE COMO PUEDE LLEGAR UN ERROR
let err={
  error:{
    status:404, 
    message:'El contenido que estás buscando no existe'
  }
}
*/

/*
ESTE ES EL OBJETO QUE RECIBO CUANDO EL ERROR PROVIENE DE SPRING SECURITY
HttpErrorResponse {headers: _HttpHeaders, status: 401, statusText: 'OK', url: 'http://localhost:8080/api/auth/login', ok: false, …}
error
: 
error
: 
"Unauthorized"
message
: 
"Petición no autorizada. EL usuario necesita autentificarse"
path
: 
"/api/auth/login"
status
: 
401
timestamp
: 
"2026-03-04T09:08:25.547Z"
trace
: 
"org.springframework.security.authentication.BadCr
[[Prototype]]
: 
Object
headers
: 
_HttpHeaders {headers: undefined, normalizedNames: Map(0), lazyUpdate: null, lazyInit: ƒ}
message
: 
"Http failure response for http://localhost:8080/api/auth/login: 401 OK"
name
: 
"HttpErrorResponse"
ok
: 
false
redirected
: 
undefined
responseType
: 
undefined
status
: 
401
statusText
: 
"OK"
type
: 
undefined
url
: 
"http://localhost:8080/api/auth/login"
[[Prototype]]
: 
HttpResponseBase
*/