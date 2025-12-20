import { CommonModule } from '@angular/common';
import { Component, computed, effect, input, output, signal } from '@angular/core';
import { IUser } from '@app/shared/entities/user.entity';
import { DepositModal, DepositModalOption, DepositModalSubmitPayload } from '../../components/deposit-modal/deposit-modal';
import { ProfileSummaryCard } from './components/profile-summary-card/profile-summary-card';
import { ProductsSummaryHeader } from './components/products-summary-header/products-summary-header';
import { AccountsGrid } from './components/accounts-grid/accounts-grid';

@Component({
  selector: 'cf-profile-dump',
  imports: [CommonModule, ProfileSummaryCard, ProductsSummaryHeader, AccountsGrid, DepositModal],
  templateUrl: './profile-dump.html',
  styleUrl: './profile-dump.scss',
})
export class ProfileDump {
  user = input<IUser | null>(null);
  loading = input<boolean>(false);
  error = input<string | null>(null);

  depositSubmit = output<DepositModalSubmitPayload>();

  depositDialogVisible = signal(false);
  defaultAccountNumber = signal<string | null>(null);
  private depositSubmitted = signal(false);

  accountOptions = computed<DepositModalOption[]>(() => {
    const accounts = this.user()?.user_accounts ?? [];
    return accounts.map((account) => ({
      label: `${account.account_alias || 'Cuenta Principal'} - ${account.account_number}`,
      value: account.account_number
    }));
  });

  constructor() {
    effect(() => {
      if (!this.depositSubmitted()) return;
      if (this.loading()) return;

      const error = this.error();
      if (!error) {
        this.closeDeposit();
      }
      this.depositSubmitted.set(false);
    });
  }

  openDeposit() {
    const accountNumber = this.user()?.user_accounts?.[0]?.account_number ?? null;
    this.defaultAccountNumber.set(accountNumber);
    this.depositDialogVisible.set(true);
  }

  closeDeposit() {
    this.depositDialogVisible.set(false);
    this.defaultAccountNumber.set(null);
  }

  handleDepositVisibleChange(visible: boolean) {
    if (!visible) {
      this.closeDeposit();
      return;
    }
    this.depositDialogVisible.set(true);
  }

  handleDepositSubmit(payload: DepositModalSubmitPayload) {
    if (!payload?.accountNumber || !Number.isFinite(payload.amount) || payload.amount <= 0) return;
    if (this.depositSubmitted()) return;
    this.depositSubmitted.set(true);
    this.depositSubmit.emit(payload);
  }
}
