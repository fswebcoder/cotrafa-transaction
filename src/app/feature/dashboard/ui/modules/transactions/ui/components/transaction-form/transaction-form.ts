import { CommonModule } from '@angular/common';
import { Component, computed, effect, input, output } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from '@angular/forms';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { IUser } from '@app/shared/entities/user.entity';
import { CustomSelect } from '@app/shared/components/custom-select/custom-select';
import { CustomButton } from '@app/shared/components/custom-button/custom-button';
import { CustomInput } from '@app/shared/components/custom-input/custom-input';
import { TransactionFormOutput } from '../../../domain/dtos/transaction-request.dto';

@Component({
  selector: 'cf-transaction-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CardModule,
    DividerModule,
    CustomSelect,
    CustomButton,
    CustomInput
  ],
  templateUrl: './transaction-form.html',
  styleUrl: './transaction-form.scss',
})
export class TransactionForm {
  user = input<IUser | null>(null);
  users = input<IUser[]>([]);
  
  onTransfer = output<TransactionFormOutput>();

  userOptions = computed(() => {
    const currentUserId = this.user()?.user_id;
    return this.users()
      .filter(user => user.user_id !== currentUserId)
      .map(user => ({
      label: `${user.user_name} ${user.last_name} - ${user.document_number}`,
      value: user 
    }));
  });

  beneficiaryNotSourceValidator = (control: AbstractControl): ValidationErrors | null => {
    const currentUser = this.user();
    const beneficiary = control.value as IUser | null;

    const sourceAccountNumber = currentUser?.user_accounts?.[0]?.account_number;
    const destinationAccountNumber = beneficiary?.user_accounts?.[0]?.account_number;

    if (!sourceAccountNumber || !destinationAccountNumber) return null;
    if (sourceAccountNumber === destinationAccountNumber) return { sameAccount: true };
    return null;
  };

  form = new FormGroup({
    beneficiary: new FormControl<IUser | null>(null, [Validators.required, this.beneficiaryNotSourceValidator]),
    amount: new FormControl<number | null>(null, [
      Validators.required, 
      Validators.min(1),
      (control) => {
         const user = this.user();
         if (!user?.user_accounts?.[0] || !control.value) return null;
         const balance = user.user_accounts[0].account_balance;
         if (Number(control.value) > balance) {
           return { maxAmount: { max: balance, actual: control.value } };
         }
         return null;
       }
    ])
  });

  constructor() {
    effect(() => {
      this.user();
      this.form.controls.amount.updateValueAndValidity();
      this.form.controls.beneficiary.updateValueAndValidity();
    });
  }

  get selectedBeneficiary(): IUser | null | undefined {
    return this.form.value.beneficiary;
  }

  submit() {
    const user = this.user();
    const beneficiary = this.form.value.beneficiary;
    const amount = this.form.value.amount;

    if (this.form.valid && beneficiary && amount && user?.user_accounts?.[0] && beneficiary.user_accounts?.[0]) {
      const sourceAccountNumber = user.user_accounts[0].account_number;
      const destinationAccountNumber = beneficiary.user_accounts[0].account_number;

      if (sourceAccountNumber === destinationAccountNumber) {
        const currentErrors = this.form.controls.beneficiary.errors ?? {};
        this.form.controls.beneficiary.setErrors({ ...currentErrors, sameAccount: true });
        this.form.controls.beneficiary.markAsTouched();
        return;
      }

      this.onTransfer.emit({
        sourceAccountNumber,
        destinationAccountNumber,
        amount: Number(amount),
        beneficiaryId: beneficiary.user_id,
        beneficiaryName: `${beneficiary.user_name} ${beneficiary.last_name}`
      });
    }
  }
}
