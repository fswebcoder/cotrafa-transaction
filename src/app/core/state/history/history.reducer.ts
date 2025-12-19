import { createReducer, on } from '@ngrx/store';
import { IHistory } from '@app/feature/dashboard/ui/modules/history/domain/entities/history.entity';
import * as HistoryActions from './history.actions';

export interface HistoryState {
  history: IHistory[];
  totalElements: number;
  loading: boolean;
  error: string | null;
}

export const initialState: HistoryState = {
  history: [],
  totalElements: 0,
  loading: false,
  error: null
};

export const historyReducer = createReducer(
  initialState,
  on(HistoryActions.loadHistory, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(HistoryActions.loadHistorySuccess, (state, { response }) => ({
    ...state,
    loading: false,
    history: response.content,
    totalElements: response.totalElements
  })),
  on(HistoryActions.loadHistoryFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);
