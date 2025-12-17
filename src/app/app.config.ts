import { ApplicationConfig, isDevMode, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { providePrimeNG } from 'primeng/config';
import { definePreset } from '@primeuix/themes';
import Nora from '@primeng/themes/nora';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { routes } from './app.routes';
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
    provideRouter(routes),
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
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),

  ]
};
