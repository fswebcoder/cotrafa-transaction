import { HttpHeaders, HttpRequest } from '@angular/common/http';
import { of } from 'rxjs';

import { credentialsInterceptor } from './credentials.interceptor';
import { environment } from '@app/enviromments/environment';

describe('credentialsInterceptor', () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  it('Debería agregar el encabezado Authorization para solicitudes de la API cuando el token existe', () => {
    sessionStorage.setItem('token', 'abc');
    const req = new HttpRequest('GET', `${environment.services.apiUrl}users`);

    let captured: HttpRequest<unknown> | undefined;
    credentialsInterceptor(req, (nextReq) => {
      captured = nextReq;
      return of({} as any);
    }).subscribe();

    expect(captured?.withCredentials).toBe(true);
    expect(captured?.headers.get('Authorization')).toBe('Bearer abc');
  });

  it('Debería no sobrescribir el encabezado Authorization cuando ya está presente', () => {
    sessionStorage.setItem('token', 'abc');
    const req = new HttpRequest('GET', `${environment.services.apiUrl}users`, null, {
      headers: new HttpHeaders({ Authorization: 'Bearer existing' })
    });

    let captured: HttpRequest<unknown> | undefined;
    credentialsInterceptor(req, (nextReq) => {
      captured = nextReq;
      return of({} as any);
    }).subscribe();

    expect(captured?.headers.get('Authorization')).toBe('Bearer existing');
  });

  it('Debería no agregar el encabezado Authorization para solicitudes de inicio de sesión de autenticación', () => {
    sessionStorage.setItem('token', 'abc');
    const req = new HttpRequest('POST', `${environment.services.apiUrl}auth/login`, null);

    let captured: HttpRequest<unknown> | undefined;
    credentialsInterceptor(req, (nextReq) => {
      captured = nextReq;
      return of({} as any);
    }).subscribe();

    expect(captured?.withCredentials).toBe(true);
    expect(captured?.headers.has('Authorization')).toBe(false);
  });

  it('Debería siempre establecer withCredentials', () => {
    const req = new HttpRequest('GET', 'https://example.com/public');

    let captured: HttpRequest<unknown> | undefined;
    credentialsInterceptor(req, (nextReq) => {
      captured = nextReq;
      return of({} as any);
    }).subscribe();

    expect(captured?.withCredentials).toBe(true);
  });
});
