import { createAction, props } from '@ngrx/store';
import { IHistory, IPaginatedResponse } from '@app/feature/dashboard/ui/modules/history/domain/entities/history.entity';

export const loadHistory = createAction(
  '[History] Load History',
  props<{ accountId: number; page: number; size: number }>()
);

export const loadHistorySuccess = createAction(
  '[History] Load History Success',
  props<{ response: IPaginatedResponse<IHistory> }>()
);

export const loadHistoryFailure = createAction(
  '[History] Load History Failure',
  props<{ error: string }>()
);
