import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { CardModule } from 'primeng/card';
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { IUser } from '@app/shared/entities/user.entity';
import { IHistory } from '../../../domain/entities/history.entity';
import { CusDisplay } from '../../components/cus-display/cus-display';

@Component({
  selector: 'cf-history-dump',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    SkeletonModule,
    TableModule,
    PaginatorModule,
    CusDisplay
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
