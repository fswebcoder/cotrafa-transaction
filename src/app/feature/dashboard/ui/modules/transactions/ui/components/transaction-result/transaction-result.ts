import { CommonModule } from '@angular/common';
import { Component, input, output, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TooltipModule } from 'primeng/tooltip';
import { CustomButton } from '@app/shared/components/custom-button/custom-button';
import { ITransaction } from '../../../domain/entities/transaction.entity';

@Component({
  selector: 'cf-transaction-result',
  standalone: true,
  imports: [CommonModule, CardModule, ButtonModule, CustomButton, TooltipModule],
  templateUrl: './transaction-result.html',
})
export class TransactionResult {
  transaction = input.required<ITransaction>();
  onNewTransaction = output<void>();

  showOriginalCus = signal(false);
  copied = signal(false);

  toggleCusVisibility() {
    this.showOriginalCus.update(v => !v);
  }

  async copyToClipboard() {
    const textToCopy = this.showOriginalCus() ? this.transaction().cus : this.transaction().encryptedCus;
    try {
      await navigator.clipboard.writeText(textToCopy);
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 2000);
    } catch (err) {
      console.error('Error al copiar al portapapeles: ', err);
    }
  }
}
