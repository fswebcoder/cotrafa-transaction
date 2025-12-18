import { createAction, props } from '@ngrx/store';
import { IUser } from '@app/shared/entities/user.entity';

export const loadUsers = createAction(
  '[Transactions] Load Users'
);

export const loadUsersSuccess = createAction(
  '[Transactions] Load Users Success',
  props<{ users: IUser[] }>()
);

export const loadUsersFailure = createAction(
  '[Transactions] Load Users Failure',
  props<{ error: string }>()
);
