import { Component, inject, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { TransactionDump } from '../transaction-dump/transaction-dump';
import { selectUser } from '@app/core/state/auth/auth.selectors';
import { IUser } from '@app/shared/entities/user.entity';

@Component({
  selector: 'cf-transaction-smart',
  imports: [TransactionDump],
  templateUrl: './transaction-smart.html',
  styleUrl: './transaction-smart.scss',
})
export class TransactionSmart {
  private store = inject(Store);
  
  user = this.store.selectSignal(selectUser);
  
  users = signal<IUser[]>([
    {
      user_id: 2,
      user_name: 'Maria',
      last_name: 'Gonzalez',
      document_type: 'CC',
      document_number: '987654321',
      user_accounts: [{ account_id: 2, account_number: '9988776655', account_alias: 'Ahorros', account_balance: 0 }]
    },
    {
      user_id: 3,
      user_name: 'Carlos',
      last_name: 'Rodriguez',
      document_type: 'CC',
      document_number: '456789123',
      user_accounts: [{ account_id: 3, account_number: '1122334455', account_alias: 'Ahorros', account_balance: 0 }]
    }
  ]);

  handleTransfer(event: { beneficiaryId: number; amount: number }) {
    console.log('Transfer requested:', event);
    // TODO: Dispatch transfer action
  }
}
