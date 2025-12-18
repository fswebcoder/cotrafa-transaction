import { createReducer, on } from '@ngrx/store';
import { IUser } from '@app/shared/entities/user.entity';
import { ITransaction } from '@app/feature/dashboard/ui/modules/transactions/domain/entities/transaction.entity';
import * as TransactionActions from './transactions.actions';

export interface TransactionState {
  users: IUser[];
  loading: boolean;
  error: string | null;
  lastTransaction: ITransaction | null;
}

export const initialState: TransactionState = {
  users: [],
  loading: false,
  error: null,
  lastTransaction: null
};

export const transactionReducer = createReducer(
  initialState,
  on(TransactionActions.loadUsers, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(TransactionActions.loadUsersSuccess, (state, { users }) => ({
    ...state,
    users,
    loading: false
  })),
  on(TransactionActions.loadUsersFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  })),
  on(TransactionActions.saveTransaction, (state) => ({
    ...state,
    loading: true,
    error: null,
    lastTransaction: null
  })),
  on(TransactionActions.saveTransactionSuccess, (state, { transaction }) => ({
    ...state,
    lastTransaction: transaction,
    loading: false
  })),
  on(TransactionActions.saveTransactionFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  })),
    on(TransactionActions.resetTransactionState, (state) => ({
        ...state,
        lastTransaction: null,
        error: null,
        loading: false
    }))
);
