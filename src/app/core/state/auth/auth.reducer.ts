import { createReducer, on } from '@ngrx/store';
import { AuthActions } from './auth.actions';
import { IUser } from '@app/feature/auth/domain/entities/user.entity';

export interface AuthState {
    user: IUser | null;
    loading: boolean;
    error: string | null;
    isInitialized: boolean;
}

export const initialState: AuthState = {
    user: null,
    loading: false,
    error: null,
    isInitialized: false
};

export const authReducer = createReducer(
    initialState,
    on(AuthActions.checkAuth, (state) => ({
        ...state,
        loading: true
    })),
    on(AuthActions.checkAuthComplete, (state) => ({
        ...state,
        loading: false,
        isInitialized: true
    })),
    on(AuthActions.login, (state) => ({
        ...state,
        loading: true,
        error: null,
    })),
    on(AuthActions.loginSuccess, (state, { user }) => ({
        ...state,
        user,
        loading: false,
        error: null,
    })),
    on(AuthActions.restoreSessionSuccess, (state, { user }) => ({
        ...state,
        user,
        loading: false,
        error: null,
    })),
    on(AuthActions.loginFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),
    on(AuthActions.logout, (state) => ({
        ...state,
        user: null,
        loading: false,
        error: null,
    }))
);
