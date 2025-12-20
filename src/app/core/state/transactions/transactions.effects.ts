import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError, withLatestFrom, exhaustMap, tap } from 'rxjs/operators';
import * as TransactionActions from './transactions.actions';
import { IUsersRepository } from '@app/feature/dashboard/ui/modules/transactions/domain/repositories/users.repository';
import { CusEncryptionService } from '@app/core/services/cus-encryption.service';
import { ITransaction } from '@app/feature/dashboard/ui/modules/transactions/domain/entities/transaction.entity';
import { ITransactionsRepository } from '@app/feature/dashboard/ui/modules/transactions/domain/repositories/transactions.repository';
import { TransactionRequestDto } from '@app/feature/dashboard/ui/modules/transactions/domain/dtos/transaction-request.dto';
import { Store } from '@ngrx/store';
import { selectUser } from '@app/core/state/auth/auth.selectors';
import { AuthActions } from '@app/core/state/auth/auth.actions';
import { ToastService } from '@app/shared/services/toast.service';

@Injectable()
export class TransactionEffects {
  private actions$ = inject(Actions);
  private usersRepository = inject(IUsersRepository);
  private transactionsRepository = inject(ITransactionsRepository);
  private cusService = inject(CusEncryptionService);
  private store = inject(Store);
  private toast = inject(ToastService);

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TransactionActions.loadUsers),
      mergeMap(() =>
        this.usersRepository.getUsers().pipe(
          map((response) =>
            response.success
              ? TransactionActions.loadUsersSuccess({ users: response.data })
              : TransactionActions.loadUsersFailure({ error: response.message || 'Error cargando usuarios' })
          ),
          catchError((error) =>
            of(
              TransactionActions.loadUsersFailure({
                error: error?.error?.message || error?.message || 'Error cargando usuarios'
              })
            )
          )
        )
      )
    )
  );

  saveTransaction$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TransactionActions.saveTransaction),
      mergeMap(action => {
        try {
          const cus = this.cusService.generateCUS(action.userId, action.beneficiaryId, action.amount);
          const encryptedCus = this.cusService.encrypt(cus);
          
          const request: TransactionRequestDto = {
            sourceAccountNumber: action.sourceAccountNumber,
            destinationAccountNumber: action.destinationAccountNumber,
            amount: action.amount,
            cus: cus
          };

          return this.transactionsRepository.saveTransaction(request).pipe(
            map((response) => {
              if (!response.success) {
                return TransactionActions.saveTransactionFailure({ error: response.message || 'Error procesando transferencia' });
              }
              const transaction: ITransaction = {
                id: crypto.randomUUID(),
                sourceAccountId: action.sourceAccountId,
                beneficiaryId: action.beneficiaryId,
                beneficiaryName: action.beneficiaryName,
                amount: action.amount,
                date: new Date(),
                cus: cus,
                encryptedCus: encryptedCus
              };

              return TransactionActions.saveTransactionSuccess({ transaction, userId: action.userId });
            }),
            catchError((error) =>
              of(
                TransactionActions.saveTransactionFailure({
                  error: error?.error?.message || error?.message || 'Error procesando transferencia'
                })
              )
            )
          );
        } catch (error: any) {
          return of(TransactionActions.saveTransactionFailure({ error: error?.message || 'Error procesando transferencia' }));
        }
      })
    )
  );

  depositToAccount$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TransactionActions.depositToAccount),
      exhaustMap(({ accountNumber, amount, userId }) => {
        if (!accountNumber || !Number.isFinite(amount) || amount <= 0) {
          return of(TransactionActions.depositToAccountFailure({ error: 'Invalid deposit payload' }));
        }

        return this.transactionsRepository.depositToAccount({ accountNumber, amount }).pipe(
          map((response) =>
            response.success
              ? TransactionActions.depositToAccountSuccess({ userId })
              : TransactionActions.depositToAccountFailure({ error: response.message || 'Error procesando recarga' })
          ),
          catchError(error =>
            of(
              TransactionActions.depositToAccountFailure({
                error: error?.error?.message || error?.message || 'Error procesando recarga'
              })
            )
          )
        );
      })
    )
  );

  refreshUserAccountsAfterMoneyOperation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TransactionActions.saveTransactionSuccess, TransactionActions.depositToAccountSuccess),
      withLatestFrom(this.store.select(selectUser)),
      mergeMap(([{ userId }, currentUser]) => {
        if (!currentUser || currentUser.user_id !== userId) {
          return of(AuthActions.updateUserFailure({ error: 'User not available for accounts refresh' }));
        }

        return this.transactionsRepository.getAccountsByUser(userId).pipe(
          map((response) =>
            response.success
              ? AuthActions.updateUser({ user: { ...currentUser, user_accounts: response.data } })
              : AuthActions.updateUserFailure({ error: response.message || 'Error actualizando cuentas' })
          ),
          catchError((error) =>
            of(
              AuthActions.updateUserFailure({
                error: error?.error?.message || error?.message || 'Error actualizando cuentas'
              })
            )
          )
        );
      })
    )
  );

  loadUsersSuccessToast$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(TransactionActions.loadUsersSuccess),
        tap(({ users }) => this.toast.showInfo('Usuarios cargados', `Se cargaron ${users.length} usuarios`))
      ),
    { dispatch: false }
  );

  loadUsersFailureToast$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(TransactionActions.loadUsersFailure),
        tap(({ error }) => this.toast.showError('Error', error || 'No fue posible cargar usuarios'))
      ),
    { dispatch: false }
  );

  saveTransactionSuccessToast$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(TransactionActions.saveTransactionSuccess),
        tap(({ transaction }) => this.toast.showSuccess('Transferencia exitosa', `Destino: ${transaction.beneficiaryName}`))
      ),
    { dispatch: false }
  );

  saveTransactionFailureToast$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(TransactionActions.saveTransactionFailure),
        tap(({ error }) => this.toast.showError('Error', error || 'No fue posible realizar la transferencia'))
      ),
    { dispatch: false }
  );

  depositToAccountSuccessToast$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(TransactionActions.depositToAccountSuccess),
        tap(() => this.toast.showSuccess('Recarga exitosa', 'La recarga se procesó correctamente'))
      ),
    { dispatch: false }
  );

  depositToAccountFailureToast$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(TransactionActions.depositToAccountFailure),
        tap(({ error }) => this.toast.showError('Error', error || 'No fue posible realizar la recarga'))
      ),
    { dispatch: false }
  );
}
