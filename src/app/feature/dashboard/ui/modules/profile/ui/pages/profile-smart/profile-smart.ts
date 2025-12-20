import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { ProfileDump } from '../profile-dump/profile-dump';
import { selectUser } from '@app/core/state/auth/auth.selectors';
import { depositToAccount } from '@app/core/state/transactions/transactions.actions';
import { selectTransactionError, selectTransactionLoading } from '@app/core/state/transactions/transactions.selectors';

@Component({
  selector: 'cf-profile-smart',
  imports: [ProfileDump],
  templateUrl: './profile-smart.html',
  styleUrl: './profile-smart.scss',
})
export class ProfileSmart {
  private store = inject(Store);
  user = this.store.selectSignal(selectUser);

  loading = this.store.selectSignal(selectTransactionLoading);
  error = this.store.selectSignal(selectTransactionError);

  handleDeposit(event: { accountNumber: string; amount: number }) {
    const currentUser = this.user();
    if (!currentUser) return;

    this.store.dispatch(
      depositToAccount({
        userId: currentUser.user_id,
        accountNumber: event.accountNumber,
        amount: event.amount
      })
    );
  }
}
