import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, exhaustMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthActions } from './auth.actions';
import { AuthUseCase } from '@app/feature/auth/domain/usecases/auth.usecase';

@Injectable()
export class AuthEffects {
    private actions$ = inject(Actions);
    private authUseCase = inject(AuthUseCase);

    login$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.login),
            exhaustMap(({ loginDto }) =>
                this.authUseCase.login(loginDto).pipe(
                    map((response) => {
                        if (response.success && response.data) {
                            return AuthActions.loginSuccess({ user: response.data });
                        }
                        return AuthActions.loginFailure({ error: response.message || 'Invalid credentials' });
                    }),
                    catchError((error) => of(AuthActions.loginFailure({ error: error.message })))
                )
            )
        )
    );

    loginSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.loginSuccess),
            tap(({ user }) => {
                sessionStorage.setItem('token', user.token || '');
            })
        ),
        { dispatch: false }
    );


}
