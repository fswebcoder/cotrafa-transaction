// import { isDevMode } from '@angular/core';

export const environment = {
  production: false,
  cookie: {
    domain: 'localhost',
    sameSite: 'Lax',
    expires: 30
  },
  services: {

    // apiUrl: isDevMode() ? 'http://localhost:8080/api/' : 'cotrafa-transaction-back.railway.internal/api/',
    apiUrl: 'https://cotrafa-transaction-back-production.up.railway.app/api/',

   
  }
};
