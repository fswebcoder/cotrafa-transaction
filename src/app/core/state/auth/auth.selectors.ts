import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.reducer';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectUser = createSelector(
    selectAuthState,
    (state) => state.user
);

export const selectIsLoading = createSelector(
    selectAuthState,
    (state) => state.loading
);

export const selectLoginError = createSelector(
    selectAuthState,
    (state) => state.error
);

export const selectIsAuthInitialized = createSelector(
    selectAuthState,
    (state) => state.isInitialized
);
