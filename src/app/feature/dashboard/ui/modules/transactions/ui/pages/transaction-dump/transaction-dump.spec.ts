import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNgxMask } from 'ngx-mask';

import { TransactionDump } from './transaction-dump';

describe('TransactionDump', () => {
  let component: TransactionDump;
  let fixture: ComponentFixture<TransactionDump>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionDump],
      providers: [...provideNgxMask()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionDump);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('Debería crear el componente', () => {
    expect(component).toBeTruthy();
  });
});
