import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionDump } from './transaction-dump';

describe('TransactionDump', () => {
  let component: TransactionDump;
  let fixture: ComponentFixture<TransactionDump>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionDump]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionDump);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
