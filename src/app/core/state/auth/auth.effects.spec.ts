import { TestBed } from '@angular/core/testing';
import { Action } from '@ngrx/store';
import { provideMockActions } from '@ngrx/effects/testing';
import { Subject, firstValueFrom, of, throwError } from 'rxjs';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { vi } from 'vitest';

import { AuthEffects } from './auth.effects';
import { AuthActions } from './auth.actions';
import { AuthUseCase } from '@app/feature/auth/domain/usecases/auth.usecase';
import { ToastService } from '@app/shared/services/toast.service';
import { IUser } from '@app/shared/entities/user.entity';

describe('AuthEffects', () => {
  let actions$: Subject<Action>;
  let effects: AuthEffects;

  const routerMock = { navigate: vi.fn() };
  const toastMock = { showSuccess: vi.fn(), showError: vi.fn(), showInfo: vi.fn() };
  const authUseCaseMock = { login: vi.fn() };

  const user: IUser = {
    user_id: 1,
    user_name: 'Juan',
    last_name: 'Perez',
    document_type: 'CC',
    user_accounts: [],
    token: 'token'
  };

  beforeEach(() => {
    sessionStorage.clear();
    localStorage.clear();
    actions$ = new Subject<Action>();

    TestBed.configureTestingModule({
      providers: [
        AuthEffects,
        provideMockActions(() => actions$),
        { provide: Router, useValue: routerMock },
        { provide: ToastService, useValue: toastMock },
        { provide: AuthUseCase, useValue: authUseCaseMock }
      ]
    });

    effects = TestBed.inject(AuthEffects);
  });

  it('Debería despachar loginSuccess cuando el inicio de sesión es exitoso', async () => {
    authUseCaseMock.login.mockReturnValue(of({ success: true, message: 'ok', data: user }));
    const result = firstValueFrom(effects.login$.pipe(take(1)));

    actions$.next(AuthActions.login({ loginDto: { username: 'u', password: 'p' } }));

    await expect(result).resolves.toEqual(AuthActions.loginSuccess({ user }));
  });

  it('Debería despachar loginFailure cuando las credenciales son inválidas', async () => {
    authUseCaseMock.login.mockReturnValue(of({ success: false, message: 'no', data: null as any }));
    const result = firstValueFrom(effects.login$.pipe(take(1)));

    actions$.next(AuthActions.login({ loginDto: { username: 'u', password: 'p' } }));

    await expect(result).resolves.toEqual(AuthActions.loginFailure({ error: 'Credenciales inválidas' }));
  });

  it('Debería despachar loginFailure cuando ocurre un error en el inicio de sesión', async () => {
    authUseCaseMock.login.mockReturnValue(throwError(() => new Error('fail')));
    const result = firstValueFrom(effects.login$.pipe(take(1)));

    actions$.next(AuthActions.login({ loginDto: { username: 'u', password: 'p' } }));

    await expect(result).resolves.toEqual(AuthActions.loginFailure({ error: 'Error iniciando sesión' }));
  });

  it('Debería persistir la sesión y navegar a /dashboard en loginSuccess', () => {
    const subscription = effects.loginSuccess$.subscribe();

    actions$.next(AuthActions.loginSuccess({ user }));

    expect(toastMock.showSuccess).toHaveBeenCalledWith('Sesión iniciada', `Bienvenido ${user.user_name}`);
    expect(sessionStorage.getItem('token')).toBe('token');
    expect(JSON.parse(sessionStorage.getItem('user') as string)).toEqual({ ...user, token: '' });
    expect(routerMock.navigate).toHaveBeenCalledWith(['/dashboard']);
    subscription.unsubscribe();
  });

  it('Debería mostrar una notificación de error en loginFailure', () => {
    const subscription = effects.loginFailureToast$.subscribe();

    actions$.next(AuthActions.loginFailure({ error: 'x' }));

    expect(toastMock.showError).toHaveBeenCalledWith('Error', 'x');
    subscription.unsubscribe();
  });

  it('Debería recuperar la sesión cuando el usuario existe en checkAuth', async () => {
    const userWithoutToken = { ...user, token: '' };
    sessionStorage.setItem('user', JSON.stringify(userWithoutToken));
    const result = firstValueFrom(effects.checkAuth$.pipe(take(1)));

    actions$.next(AuthActions.checkAuth());

    await expect(result).resolves.toEqual(AuthActions.restoreSessionSuccess({ user: userWithoutToken as any }));
  });

  it('Debería completar la verificación de autenticación en checkAuth cuando el usuario está ausente', async () => {
    sessionStorage.removeItem('user');
    const result = firstValueFrom(effects.checkAuth$.pipe(take(1)));

    actions$.next(AuthActions.checkAuth());

    await expect(result).resolves.toEqual(AuthActions.checkAuthComplete());
  });

  it('Debería eliminar las sesiones y navegar a /login en logout', () => {
    sessionStorage.setItem('token', 't');
    localStorage.setItem('x', 'y');
    const subscription = effects.logout$.subscribe();

    actions$.next(AuthActions.logout());

    expect(sessionStorage.getItem('token')).toBeNull();
    expect(localStorage.getItem('x')).toBeNull();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/login']);
    subscription.unsubscribe();
  });
});

