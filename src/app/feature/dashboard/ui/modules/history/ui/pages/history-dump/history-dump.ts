import { Component, input, output } from '@angular/core';
import { PaginatorState } from 'primeng/paginator';
import { IUser } from '@app/shared/entities/user.entity';
import { IHistory } from '../../../domain/entities/history.entity';
import { AccountSummaryCard } from './components/account-summary-card/account-summary-card';
import { HistoryTransactionsCard } from './components/history-transactions-card/history-transactions-card';

@Component({
  selector: 'cf-history-dump',
  standalone: true,
  imports: [
    AccountSummaryCard,
    HistoryTransactionsCard
  ],
  templateUrl: './history-dump.html',
  styleUrl: './history-dump.scss',
})
export class HistoryDump {
  user = input<IUser | null>(null);
  history = input<IHistory[]>([]);
  totalElements = input<number>(0);
  loading = input<boolean>(false);
  
  onPageChange = output<PaginatorState>();
}
