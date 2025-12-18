import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TransactionState } from './transactions.reducer';

export const selectTransactionState = createFeatureSelector<TransactionState>('transactions');

export const selectUsers = createSelector(
  selectTransactionState,
  (state) => state.users
);

export const selectTransactionLoading = createSelector(
  selectTransactionState,
  (state) => state.loading
);

export const selectTransactionError = createSelector(
  selectTransactionState,
  (state) => state.error
);

export const selectLastTransaction = createSelector(
    selectTransactionState,
    (state) => state.lastTransaction
);
