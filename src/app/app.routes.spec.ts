import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { routes } from './app.routes';

describe('routes guards', () => {
  const routerMock = {
    parseUrl: (url: string) => `parsed:${url}`
  };

  beforeEach(() => {
    sessionStorage.clear();
    TestBed.configureTestingModule({
      providers: [{ provide: Router, useValue: routerMock }]
    });
  });

  it('Debería redirigir a /login cuando la sesión es inválida', () => {
    const dashboardRoute = routes.find((r) => r.path === 'dashboard')!;
    const guard = dashboardRoute.canMatch?.[0] as any;

    const result = TestBed.runInInjectionContext(() => guard());

    expect(result).toBe('parsed:/login');
  });

  it('Debería permitir cuando la sesión es válida', () => {
    sessionStorage.setItem('token', 'abc');
    sessionStorage.setItem('user', JSON.stringify({ user_id: 1 }));
    const dashboardRoute = routes.find((r) => r.path === 'dashboard')!;
    const guard = dashboardRoute.canMatch?.[0] as any;

    const result = TestBed.runInInjectionContext(() => guard());

    expect(result).toBe(true);
  });

  it('Debería redirigir a /dashboard cuando la sesión es válida', () => {
    sessionStorage.setItem('token', 'abc');
    sessionStorage.setItem('user', JSON.stringify({ user_id: 1 }));
    const loginRoute = routes.find((r) => r.path === 'login')!;
    const guard = loginRoute.canMatch?.[0] as any;

    const result = TestBed.runInInjectionContext(() => guard());

    expect(result).toBe('parsed:/dashboard');
  });

  it('Debería permitir cuando la sesión es inválida', () => {
    const loginRoute = routes.find((r) => r.path === 'login')!;
    const guard = loginRoute.canMatch?.[0] as any;

    const result = TestBed.runInInjectionContext(() => guard());

    expect(result).toBe(true);
  });
});

