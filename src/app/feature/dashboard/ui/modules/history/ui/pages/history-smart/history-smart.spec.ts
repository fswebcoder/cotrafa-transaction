import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HistorySmart } from './history-smart';
import { Store } from '@ngrx/store';
import { HistoryUsecase } from '../../../domain/usecases/history.usecase';
import { of } from 'rxjs';
import { vi } from 'vitest';

describe('HistorySmart', () => {
  let component: HistorySmart;
  let fixture: ComponentFixture<HistorySmart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistorySmart],
      providers: [
        { 
          provide: Store, 
          useValue: { 
            selectSignal: () => () => ({ user_accounts: [{ account_id: 1 }] }),
            dispatch: vi.fn()
          } 
        },
        {
          provide: HistoryUsecase,
          useValue: {
            getHistory: () => of({ data: [] })
          }
        }
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HistorySmart);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
