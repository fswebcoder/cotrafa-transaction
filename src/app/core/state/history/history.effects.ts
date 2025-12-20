import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import { HistoryUsecase } from '@app/feature/dashboard/ui/modules/history/domain/usecases/history.usecase';
import * as HistoryActions from './history.actions';
import { ToastService } from '@app/shared/services/toast.service';

@Injectable()
export class HistoryEffects {
  private actions$ = inject(Actions);
  private historyUsecase = inject(HistoryUsecase);
  private toast = inject(ToastService);

  loadHistory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(HistoryActions.loadHistory),
      mergeMap(({ accountId, page, size }) =>
        this.historyUsecase.getHistory(accountId, page, size).pipe(
          map((response) =>
            response.success
              ? HistoryActions.loadHistorySuccess({ response: response.data })
              : HistoryActions.loadHistoryFailure({ error: response.message || 'Error cargando historial' })
          ),
          catchError((error) =>
            of(
              HistoryActions.loadHistoryFailure({
                error: error?.error?.message || error?.message || 'Error cargando historial'
              })
            )
          )
        )
      )
    )
  );

  loadHistorySuccessToast$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(HistoryActions.loadHistorySuccess),
        tap(({ response }) => {
          const pageLabel =
            Number.isFinite(response.pageNumber) && Number.isFinite(response.totalPages) && response.totalPages > 0
              ? `Página ${response.pageNumber + 1} de ${response.totalPages}`
              : 'Historial cargado';
          this.toast.showInfo('Historial', pageLabel);
        })
      ),
    { dispatch: false }
  );

  loadHistoryFailureToast$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(HistoryActions.loadHistoryFailure),
        tap(({ error }) => this.toast.showError('Error', error || 'No fue posible cargar el historial'))
      ),
    { dispatch: false }
  );
}
