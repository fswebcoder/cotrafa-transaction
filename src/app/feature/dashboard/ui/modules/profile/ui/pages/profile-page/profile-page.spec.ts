import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Store } from '@ngrx/store';
import { provideNgxMask } from 'ngx-mask';
import { vi } from 'vitest';

import { ProfilePage } from './profile-page';

describe('ProfilePage', () => {
  let component: ProfilePage;
  let fixture: ComponentFixture<ProfilePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfilePage],
      providers: [
        provideRouter([]),
        { provide: Store, useValue: { selectSignal: vi.fn(() => () => null), dispatch: vi.fn() } },
        ...provideNgxMask()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfilePage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('Debería crear el componente', () => {
    expect(component).toBeTruthy();
  });
});
