import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { authReducer, AuthState } from './auth/auth.reducer';
import { AuthEffects } from './auth/auth.effects';
import { transactionReducer, TransactionState } from './transactions/transactions.reducer';
import { TransactionEffects } from './transactions/transactions.effects';

export interface AppState {
  auth: AuthState;
  transactions: TransactionState;
}

export const STORE_REDUCERS: ActionReducerMap<AppState> = {
  auth: authReducer,
  transactions: transactionReducer
};

export const META_REDUCERS: MetaReducer<AppState>[] = [];

export const STORE_EFFECTS = [
  AuthEffects,
  TransactionEffects
];
