import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNgxMask } from 'ngx-mask';
import { Store } from '@ngrx/store';
import { vi } from 'vitest';

import { AuhtPage } from './auht-page';

describe('AuhtPage', () => {
  let component: AuhtPage;
  let fixture: ComponentFixture<AuhtPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuhtPage],
      providers: [
        ...provideNgxMask(),
        { provide: Store, useValue: { selectSignal: vi.fn(() => () => false), dispatch: vi.fn() } }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuhtPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('Debería crear el componente', () => {
    expect(component).toBeTruthy();
  });
});
