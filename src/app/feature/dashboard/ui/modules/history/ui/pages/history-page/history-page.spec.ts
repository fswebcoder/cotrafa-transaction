import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HistoryPage } from './history-page';
import { Store } from '@ngrx/store';
import { vi } from 'vitest';

describe('HistoryPage', () => {
  let component: HistoryPage;
  let fixture: ComponentFixture<HistoryPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoryPage],
      providers: [{ provide: Store, useValue: { selectSignal: vi.fn(() => () => []), dispatch: vi.fn() } }]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HistoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Debería crear el componente', () => { 
    expect(component).toBeTruthy();
  });
});
