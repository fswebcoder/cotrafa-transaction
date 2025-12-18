import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { CardModule } from 'primeng/card';
import { SkeletonModule } from 'primeng/skeleton';
import { IUser } from '@app/shared/entities/user.entity';
import { TransactionForm } from '../../components/transaction-form/transaction-form';

@Component({
  selector: 'cf-transaction-dump',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    SkeletonModule,
    TransactionForm
  ],
  templateUrl: './transaction-dump.html',
  styleUrl: './transaction-dump.scss',
})
export class TransactionDump {
  user = input<IUser | null>(null);
  users = input<IUser[]>([]);
  
  onTransfer = output<{ beneficiaryId: number; amount: number }>();
}
