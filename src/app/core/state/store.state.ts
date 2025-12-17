import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { authReducer, AuthState } from './auth/auth.reducer';
import { AuthEffects } from './auth/auth.effects';

export interface AppState {
  auth: AuthState;
}

export const STORE_REDUCERS: ActionReducerMap<AppState> = {
  auth: authReducer
};

export const META_REDUCERS: MetaReducer<AppState>[] = [];

export const STORE_EFFECTS = [
  AuthEffects
];
