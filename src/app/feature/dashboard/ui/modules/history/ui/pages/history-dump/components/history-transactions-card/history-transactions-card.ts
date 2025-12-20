import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { IHistory } from '../../../../../domain/entities/history.entity';
import { CusDisplay } from '../../../../components/cus-display/cus-display';

@Component({
  selector: 'cf-history-transactions-card',
  imports: [CommonModule, CardModule, TableModule, PaginatorModule, CusDisplay],
  templateUrl: './history-transactions-card.html',
  styleUrl: './history-transactions-card.scss',
})
export class HistoryTransactionsCard {
  history = input<IHistory[]>([]);
  totalElements = input<number>(0);
  loading = input<boolean>(false);

  onPageChange = output<PaginatorState>();
}

