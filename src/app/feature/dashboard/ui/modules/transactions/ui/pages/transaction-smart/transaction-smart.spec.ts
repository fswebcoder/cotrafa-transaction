import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionSmart } from './transaction-smart';

describe('TransactionSmart', () => {
  let component: TransactionSmart;
  let fixture: ComponentFixture<TransactionSmart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionSmart]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionSmart);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
