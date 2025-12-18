import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TransactionDump } from '../transaction-dump/transaction-dump';
import { selectUser } from '@app/core/state/auth/auth.selectors';
import { loadUsers } from '@app/core/state/transactions/transactions.actions';
import { selectUsers } from '@app/core/state/transactions/transactions.selectors';

@Component({
  selector: 'cf-transaction-smart',
  imports: [TransactionDump],
  templateUrl: './transaction-smart.html',
  styleUrl: './transaction-smart.scss',
})
export class TransactionSmart implements OnInit {
  private store = inject(Store);
  
  user = this.store.selectSignal(selectUser);
  users = this.store.selectSignal(selectUsers);

  ngOnInit() {
    this.store.dispatch(loadUsers());
  }

  handleTransfer(event: { beneficiaryId: number; amount: number }) {
    console.log('Transfer requested:', event);
    // TODO: Dispatch transfer action
  }
}
