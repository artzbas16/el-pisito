import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './core/interceptors/auth-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withInMemoryScrolling({scrollPositionRestoration: 'enabled'})),
    provideHttpClient(withInterceptors([authInterceptor]))
  ]
};

//provideHttpClient() ES IMPRESINDIBLE PARA PODER INJECTAR httpClient EN LOS SERVICIOS
//QUE SE ENCARGUEN DE CONTACTAR CON LA API

//withInMemoryScrolling({scrollPositionRestoration: 'enabled})
