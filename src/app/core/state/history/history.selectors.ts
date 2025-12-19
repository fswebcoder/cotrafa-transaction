import { createFeatureSelector, createSelector } from '@ngrx/store';
import { HistoryState } from './history.reducer';

export const selectHistoryState = createFeatureSelector<HistoryState>('history');

export const selectHistory = createSelector(
  selectHistoryState,
  (state) => state.history
);

export const selectHistoryTotal = createSelector(
  selectHistoryState,
  (state) => state.totalElements
);

export const selectHistoryLoading = createSelector(
  selectHistoryState,
  (state) => state.loading
);

export const selectHistoryError = createSelector(
  selectHistoryState,
  (state) => state.error
);
