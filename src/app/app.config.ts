import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withInMemoryScrolling({scrollPositionRestoration: 'enabled'})),
    provideHttpClient()
  ]
};

//provideHttpClient() ES IMPRESINDIBLE PARA PODER INJECTAR httpClient EN LOS SERVICIOS
//QUE SE ENCARGUEN DE CONTACTAR CON LA API
