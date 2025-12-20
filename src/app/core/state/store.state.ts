import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { authReducer, AuthState } from './auth/auth.reducer';
import { AuthEffects } from './auth/auth.effects';
import { transactionReducer, TransactionState } from './transactions/transactions.reducer';
import { TransactionEffects } from './transactions/transactions.effects';
import { historyReducer, HistoryState } from './history/history.reducer';
import { HistoryEffects } from './history/history.effects';
import { AuthActions } from './auth/auth.actions';

export interface AppState {
  auth: AuthState;
  transactions: TransactionState;
  history: HistoryState;
}

export const STORE_REDUCERS: ActionReducerMap<AppState> = {
  auth: authReducer,
  transactions: transactionReducer,
  history: historyReducer
};

export const clearStoreOnLogout: MetaReducer<AppState> = (reducer: ActionReducer<AppState>) => {
  return (state, action) => {
    if (action.type === AuthActions.logout.type) {
      return reducer(undefined, action);
    }
    return reducer(state, action);
  };
};

export const META_REDUCERS: MetaReducer<AppState>[] = [clearStoreOnLogout];

export const STORE_EFFECTS = [
  AuthEffects,
  TransactionEffects,
  HistoryEffects
];
