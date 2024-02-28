import {
  APP_INITIALIZER,
  ApplicationConfig,
  InjectionToken,
  inject,
} from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { appRoutes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { jwtInterceptor } from './core/interceptors/jwt.interceptor';

export const API_URL = new InjectionToken<string>('API_URL');

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideRouter(appRoutes, withComponentInputBinding()),
    provideHttpClient(),
    {
      provide: API_URL,
      useValue: 'https://localhost:7236',
    },
    // {
    //   provide: APP_INITIALIZER,
    //   multi: true,
    //   useFactory:
    //     (swaggerService = inject(SwaggerService)) =>
    //     () => {
    //       swaggerService.initialize();
    //     },
    // },
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useValue: jwtInterceptor,
    },
  ],
};
