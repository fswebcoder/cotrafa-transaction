import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import * as TransactionActions from './transactions.actions';
import { IUsersRepository } from '@app/feature/dashboard/ui/modules/transactions/domain/repositories/users.repository';
import { CusEncryptionService } from '@app/core/services/cus-encryption.service';
import { ITransaction } from '@app/feature/dashboard/ui/modules/transactions/domain/entities/transaction.entity';
import { ITransactionsRepository } from '@app/feature/dashboard/ui/modules/transactions/domain/repositories/transactions.repository';
import { TransactionRequestDto } from '@app/feature/dashboard/ui/modules/transactions/domain/dtos/transaction-request.dto';

@Injectable()
export class TransactionEffects {
  private actions$ = inject(Actions);
  private usersRepository = inject(IUsersRepository);
  private transactionsRepository = inject(ITransactionsRepository);
  private cusService = inject(CusEncryptionService);

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TransactionActions.loadUsers),
      mergeMap(() =>
        this.usersRepository.getUsers().pipe(
          map(response => TransactionActions.loadUsersSuccess({ users: response.data })),
          catchError(error => of(TransactionActions.loadUsersFailure({ error: error.message })))
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
            map(() => {
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

              return TransactionActions.saveTransactionSuccess({ transaction });
            }),
            catchError(error => of(TransactionActions.saveTransactionFailure({ error: error.message || 'Error processing transaction' })))
          );
        } catch (error: any) {
          return of(TransactionActions.saveTransactionFailure({ error: error.message || 'Error processing transaction' }));
        }
      })
    )
  );
}
