import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { PaginatorState } from 'primeng/paginator';
import { HistoryDump } from '../history-dump/history-dump';
import { selectUser } from '@app/core/state/auth/auth.selectors';
import { loadHistory } from '@app/core/state/history/history.actions';
import { selectHistory, selectHistoryLoading, selectHistoryTotal } from '@app/core/state/history/history.selectors';

@Component({
  selector: 'cf-history-smart',
  imports: [HistoryDump],
  templateUrl: './history-smart.html',
  styleUrl: './history-smart.scss',
})
export class HistorySmart implements OnInit {
  private store = inject(Store);
  
  user = this.store.selectSignal(selectUser);
  history = this.store.selectSignal(selectHistory);
  totalElements = this.store.selectSignal(selectHistoryTotal);
  loading = this.store.selectSignal(selectHistoryLoading);

  ngOnInit() {
    this.loadData(0, 5);
  }

  handlePageChange(event: PaginatorState) {
    this.loadData(event.page || 0, event.rows || 5);
  }

  private loadData(page: number, size: number) {
    const currentUser = this.user();
    if (currentUser?.user_accounts?.[0]) {
      this.store.dispatch(loadHistory({ 
        accountId: currentUser.user_accounts[0].account_id,
        page,
        size
      }));
    }
  }
}
