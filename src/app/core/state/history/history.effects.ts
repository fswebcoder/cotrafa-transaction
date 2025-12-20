import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { HistoryUsecase } from '@app/feature/dashboard/ui/modules/history/domain/usecases/history.usecase';
import * as HistoryActions from './history.actions';

@Injectable()
export class HistoryEffects {
  private actions$ = inject(Actions);
  private historyUsecase = inject(HistoryUsecase);

  loadHistory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(HistoryActions.loadHistory),
      mergeMap(({ accountId, page, size }) =>
        this.historyUsecase.getHistory(accountId, page, size).pipe(
          map(response => HistoryActions.loadHistorySuccess({ response: response.data })),
          catchError(error => of(HistoryActions.loadHistoryFailure({ error: error.message })))
        )
      )
    )
  );
}
