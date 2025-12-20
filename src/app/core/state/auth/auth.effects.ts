import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, exhaustMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthActions } from './auth.actions';
import { AuthUseCase } from '@app/feature/auth/domain/usecases/auth.usecase';
import { ToastService } from '@app/shared/services/toast.service';

@Injectable()
export class AuthEffects {
    private actions$ = inject(Actions);
    private authUseCase = inject(AuthUseCase);
    private router = inject(Router);
    private toast = inject(ToastService);

    login$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.login),
            exhaustMap(({ loginDto }) =>
                this.authUseCase.login(loginDto).pipe(
                    map((response) => {
                        if (response.success && response.data) {
                            return AuthActions.loginSuccess({ user: response.data });
                        }
                        return AuthActions.loginFailure({ error:  'Credenciales inválidas' });
                    }),
                    catchError(() =>
                        of(
                            AuthActions.loginFailure({
                                error:  'Error iniciando sesión'
                            })
                        )
                    )
                )
            )
        )
    );

    loginSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.loginSuccess),
            tap(({ user }) => {
                this.toast.showSuccess('Sesión iniciada', `Bienvenido ${user.user_name}`);
                const token = user.token;
                if (token) sessionStorage.setItem('token', token);
                else sessionStorage.removeItem('token');
                const userWithoutToken = { ...user, token: '' };
                sessionStorage.setItem('user', JSON.stringify(userWithoutToken));
                this.router.navigate(['/dashboard']);
            })
        ),
        { dispatch: false }
    );

    loginFailureToast$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(AuthActions.loginFailure),
                tap(({ error }) => this.toast.showError('Error', error || 'No fue posible iniciar sesión'))
            ),
        { dispatch: false }
    );

    updateUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.updateUser),
            tap(({ user }) => {
                this.toast.showInfo('Cuentas actualizadas', 'Se actualizaron tus cuentas');
                const userWithoutToken = { ...user, token: '' };
                sessionStorage.setItem('user', JSON.stringify(userWithoutToken));
            })
        ),
        { dispatch: false }
    );

    updateUserFailureToast$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(AuthActions.updateUserFailure),
                tap(({ error }) => this.toast.showError('Error', error || 'No fue posible actualizar tus cuentas'))
            ),
        { dispatch: false }
    );

    checkAuth$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.checkAuth),
            map(() => {
                const user = sessionStorage.getItem('user');
                if (user) {
                    return AuthActions.restoreSessionSuccess({ user: JSON.parse(user) });
                }
                return AuthActions.checkAuthComplete();
            })
        )
    );

    logout$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(AuthActions.logout),
                tap(() => {
                    try {
                        sessionStorage.clear();
                    } catch {}
                    try {
                        localStorage.clear();
                    } catch {}

                    const maybeCaches = (globalThis as any).caches as CacheStorage | undefined;
                    if (maybeCaches?.keys && maybeCaches?.delete) {
                        maybeCaches
                            .keys()
                            .then((keys) => Promise.all(keys.map((key) => maybeCaches.delete(key))))
                            .catch(() => undefined);
                    }

                    this.router.navigate(['/login']);
                })
            ),
        { dispatch: false }
    );


}
