import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuhtPage } from './auht-page';

describe('AuhtPage', () => {
  let component: AuhtPage;
  let fixture: ComponentFixture<AuhtPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuhtPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuhtPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
