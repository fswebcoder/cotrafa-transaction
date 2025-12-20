import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { provideNgxMask } from 'ngx-mask';
import { vi } from 'vitest';

import { TransactionPage } from './transaction-page';
import { selectUser } from '@app/core/state/auth/auth.selectors';
import { selectLastTransaction, selectUsers } from '@app/core/state/transactions/transactions.selectors';

describe('TransactionPage', () => {
  let component: TransactionPage;
  let fixture: ComponentFixture<TransactionPage>;
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
      imports: [TransactionPage],
      providers: [
        { provide: Store, useValue: storeMock },
        ...provideNgxMask()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('Debería crear el componente', () => {
    expect(component).toBeTruthy();
  });
});
