import { createAction, props } from '@ngrx/store';
import { IUser } from '@app/shared/entities/user.entity';
import { ITransaction } from '@app/feature/dashboard/ui/modules/transactions/domain/entities/transaction.entity';

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

// Transaction Flow
export const saveTransaction = createAction(
  '[Transactions] Save Transaction',
  props<{ 
    beneficiaryId: number; 
    amount: number; 
    sourceAccountId: number; 
    sourceAccountNumber: string;
    destinationAccountNumber: string;
    beneficiaryName: string; 
    userId: number 
  }>()
);

export const saveTransactionSuccess = createAction(
  '[Transactions] Save Transaction Success',
  props<{ transaction: ITransaction; userId: number }>()
);

export const saveTransactionFailure = createAction(
  '[Transactions] Save Transaction Failure',
  props<{ error: string }>()
);

export const depositToAccount = createAction(
  '[Transactions] Deposit To Account',
  props<{
    accountNumber: string;
    amount: number;
    userId: number;
  }>()
);

export const depositToAccountSuccess = createAction(
  '[Transactions] Deposit To Account Success',
  props<{ userId: number }>()
);

export const depositToAccountFailure = createAction(
  '[Transactions] Deposit To Account Failure',
  props<{ error: string }>()
);

export const resetTransactionState = createAction(
    '[Transactions] Reset Transaction State'
);
