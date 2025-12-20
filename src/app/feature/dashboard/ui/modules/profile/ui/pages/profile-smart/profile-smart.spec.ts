import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Store } from '@ngrx/store';
import { provideNgxMask } from 'ngx-mask';
import { vi } from 'vitest';

import { ProfileSmart } from './profile-smart';

describe('ProfileSmart', () => {
  let component: ProfileSmart;
  let fixture: ComponentFixture<ProfileSmart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileSmart],
      providers: [
        provideRouter([]),
        { provide: Store, useValue: { selectSignal: vi.fn(() => () => null), dispatch: vi.fn() } },
        ...provideNgxMask()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileSmart);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('Debería crear el componente', () => {
    expect(component).toBeTruthy();
  });
});
