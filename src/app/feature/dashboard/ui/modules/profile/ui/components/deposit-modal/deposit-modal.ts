import { CommonModule } from '@angular/common';
import { Component, effect, input, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { CustomSelect } from '@app/shared/components/custom-select/custom-select';
import { CustomInput } from '@app/shared/components/custom-input/custom-input';
import { CustomButton } from '@app/shared/components/custom-button/custom-button';

export type DepositModalSubmitPayload = {
  accountNumber: string;
  amount: number;
};

export type DepositModalOption = {
  label: string;
  value: string;
};

@Component({
  selector: 'cf-deposit-modal',
  imports: [CommonModule, ReactiveFormsModule, DialogModule, CustomSelect, CustomInput, CustomButton],
  templateUrl: './deposit-modal.html',
  styleUrl: './deposit-modal.scss',
})
export class DepositModal {
  visible = input<boolean>(false);
  loading = input<boolean>(false);
  error = input<string | null>(null);
  accountOptions = input<DepositModalOption[]>([]);
  defaultAccountNumber = input<string | null>(null);

  visibleChange = output<boolean>();
  submit = output<DepositModalSubmitPayload>();

  form = new FormGroup({
    accountNumber: new FormControl<string | null>(null, [Validators.required]),
    amount: new FormControl<number | string | null>(null, [Validators.required, Validators.min(1)]),
  });

  constructor() {
    effect(() => {
      if (!this.visible()) return;

      const defaultAccount =
        this.defaultAccountNumber() ?? this.accountOptions()[0]?.value ?? null;

      this.form.reset({ accountNumber: defaultAccount, amount: null });
    });
  }

  handleVisibleChange(visible: boolean) {
    this.visibleChange.emit(visible);
  }

  cancel() {
    this.handleVisibleChange(false);
  }

  submitForm() {
    const accountNumber = this.form.value.accountNumber;
    const amount = this.normalizeAmount(this.form.value.amount);

    if (!this.form.valid || !accountNumber || amount === null) return;

    this.submit.emit({ accountNumber, amount });
  }

  private normalizeAmount(value: number | string | null | undefined): number | null {
    if (value === null || value === undefined) return null;
    if (typeof value === 'number') return Number.isFinite(value) ? value : null;

    const normalized = Number(value.replace(/[^\d.-]/g, ''));
    return Number.isFinite(normalized) ? normalized : null;
  }
}

