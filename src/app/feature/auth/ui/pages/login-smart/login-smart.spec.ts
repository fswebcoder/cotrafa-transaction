import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { vi } from 'vitest';
import { provideNgxMask } from 'ngx-mask';

import { LoginSmart } from './login-smart';
import { AuthActions } from '@app/core/state/auth/auth.actions';

describe('LoginSmart', () => {
  let component: LoginSmart;
  let fixture: ComponentFixture<LoginSmart>;
  const storeMock = {
    selectSignal: vi.fn(() => () => false),
    dispatch: vi.fn()
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginSmart],
      providers: [{ provide: Store, useValue: storeMock }, ...provideNgxMask()]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginSmart);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('Debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('Debería despachar la acción de inicio de sesión', () => {
    const loginDto = { username: 'user', password: 'password123' };

    component.onLogin(loginDto);

    expect(storeMock.dispatch).toHaveBeenCalledWith(AuthActions.login({ loginDto }));
  });
});
