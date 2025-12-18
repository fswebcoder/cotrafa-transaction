import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TransactionDump } from '../transaction-dump/transaction-dump';
import { selectUser } from '@app/core/state/auth/auth.selectors';
import { loadUsers, saveTransaction, resetTransactionState } from '@app/core/state/transactions/transactions.actions';
import { selectLastTransaction, selectUsers } from '@app/core/state/transactions/transactions.selectors';
import { TransactionResult } from '../../components/transaction-result/transaction-result';
import { TransactionFormOutput } from '../../../domain/dtos/transaction-request.dto';

@Component({
  selector: 'cf-transaction-smart',
  imports: [TransactionDump, TransactionResult],
  templateUrl: './transaction-smart.html',
  styleUrl: './transaction-smart.scss',
})
export class TransactionSmart implements OnInit {
  private store = inject(Store);
  
  user = this.store.selectSignal(selectUser);
  users = this.store.selectSignal(selectUsers);
  lastTransaction = this.store.selectSignal(selectLastTransaction);

  ngOnInit() {
    this.store.dispatch(loadUsers());
  }

  handleTransfer(event: TransactionFormOutput) {
    const currentUser = this.user();

    if (currentUser?.user_accounts?.[0]) {
      this.store.dispatch(saveTransaction({
        userId: currentUser.user_id,
        sourceAccountId: currentUser.user_accounts[0].account_id,
        sourceAccountNumber: event.sourceAccountNumber,
        destinationAccountNumber: event.destinationAccountNumber,
        beneficiaryId: event.beneficiaryId,
        beneficiaryName: event.beneficiaryName,
        amount: event.amount
      }));
    }
  }

  handleNewTransaction() {
    this.store.dispatch(resetTransactionState());
  }
}
