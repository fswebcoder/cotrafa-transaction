import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { provideNgxMask } from 'ngx-mask';
import { vi } from 'vitest';

import { TransactionSmart } from './transaction-smart';
import { selectUser } from '@app/core/state/auth/auth.selectors';
import { selectLastTransaction, selectUsers } from '@app/core/state/transactions/transactions.selectors';

describe('TransactionSmart', () => {
  let component: TransactionSmart;
  let fixture: ComponentFixture<TransactionSmart>;
  const storeMock = {
    selectSignal: vi.fn((selector: any) => {
      if (selector === selectUser) {
        return () => ({
          user_id: 1,
          user_name: 'Juan',
          last_name: 'Perez',
          document_type: 'CC',
          user_accounts: [{ account_id: 1, account_number: '1', account_alias: 'A', account_balance: 100 }]
        });
      }
      if (selector === selectUsers) return () => [];
      if (selector === selectLastTransaction) return () => null;
      return () => null;
    }),
    dispatch: vi.fn()
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionSmart],
      providers: [
        { provide: Store, useValue: storeMock },
        ...provideNgxMask()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionSmart);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('Debería crear el componente', () => {
    expect(component).toBeTruthy();
  });
});
