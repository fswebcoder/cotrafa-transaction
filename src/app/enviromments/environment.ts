import { isDevMode } from '@angular/core';

export const environment = {
  production: false,
  cookie: {
    domain: 'localhost',
    sameSite: 'Lax',
    expires: 30
  },
  services: {

    apiUrl: isDevMode() ? 'http://localhost:8080/api/' : 'http://localhost:8443/api/',
   
  }
};
