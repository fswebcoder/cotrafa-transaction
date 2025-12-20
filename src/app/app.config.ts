import { ApplicationConfig, InjectionToken, isDevMode, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import { definePreset } from '@primeuix/themes';
import Nora from '@primeng/themes/nora';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { MessageService } from 'primeng/api';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { routes } from './app.routes';
import { ALL_REPOSITORIES } from './core/providers/repositories.provider';
import { Environment } from './shared/models/environment';
import { environment } from './enviromments/environment';
import { provideCore } from './core/providers/store/provide.core';
import { credentialsInterceptor } from './core/interceptors/credentials.interceptor';
import { versionInterceptor } from './core/interceptors/version.interceptor';
import { loadingInterceptor } from './core/interceptors/loading.interceptor';
export const ENVIRONMENT = new InjectionToken<Environment>('environment');

const cfcPreset = definePreset(Nora, {
    semantic: {
        primary: {
            50: '#ecf4ff',
            100: '#d5e6ff',
            200: '#b2d3ff',
            300: '#80b6ff',
            400: '#468fff',
            500: '#004eb5',
            600: '#003e91',
            700: '#002f6d',
            800: '#002049',
            900: '#001025',
            950: '#000812'
        },
    }
});

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideAnimationsAsync(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([credentialsInterceptor, versionInterceptor, loadingInterceptor])),
    providePrimeNG({
      theme: {
        preset: cfcPreset,
        options: {
          darkModeSelector: '.app-dark',
          cssLayer: {
            name: 'primeng',
            order: 'tailwind-base, primeng, tailwind-utilities'
          }
        }
      }
    }),
    MessageService,
  { provide: ENVIRONMENT, useValue: environment },
    provideCore(),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    ...ALL_REPOSITORIES
  ]
};
