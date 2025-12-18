import { createReducer, on } from '@ngrx/store';
import { IUser } from '@app/shared/entities/user.entity';
import * as TransactionActions from './transactions.actions';

export interface TransactionState {
  users: IUser[];
  loading: boolean;
  error: string | null;
}

export const initialState: TransactionState = {
  users: [],
  loading: false,
  error: null
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
  }))
);
