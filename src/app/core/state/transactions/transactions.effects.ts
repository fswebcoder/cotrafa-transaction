import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import * as TransactionActions from './transactions.actions';
import { IUsersRepository } from '@app/feature/dashboard/ui/modules/transactions/domain/repositories/users.repository';

@Injectable()
export class TransactionEffects {
  private actions$ = inject(Actions);
  private usersRepository = inject(IUsersRepository);

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
}
