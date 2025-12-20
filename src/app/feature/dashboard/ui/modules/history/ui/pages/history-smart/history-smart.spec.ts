import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HistorySmart } from './history-smart';
import { Store } from '@ngrx/store';
import { vi } from 'vitest';
import { selectUser } from '@app/core/state/auth/auth.selectors';
import { selectHistory, selectHistoryLoading, selectHistoryTotal } from '@app/core/state/history/history.selectors';

describe('HistorySmart', () => {
  let component: HistorySmart;
  let fixture: ComponentFixture<HistorySmart>;

  beforeEach(async () => {
    const storeMock = {
      selectSignal: vi.fn((selector: any) => {
        if (selector === selectUser) {
          return () => ({ user_accounts: [{ account_id: 1, account_number: '1', account_alias: 'A', account_balance: 100 }] });
        }
        if (selector === selectHistory) return () => [];
        if (selector === selectHistoryTotal) return () => 0;
        if (selector === selectHistoryLoading) return () => false;
        return () => null;
      }),
      dispatch: vi.fn()
    };

    await TestBed.configureTestingModule({
      imports: [HistorySmart],
      providers: [
        { provide: Store, useValue: storeMock }
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HistorySmart);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Debería crear el componente', () => {
    expect(component).toBeTruthy();
  });
});
