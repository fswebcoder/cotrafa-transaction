import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { provideNgxMask } from 'ngx-mask';

import { LoginForm } from './login-form';

describe('LoginForm', () => {
  let component: LoginForm;
  let fixture: ComponentFixture<LoginForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginForm],
      providers: [...provideNgxMask()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('Debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('No debería emitir cuando el formulario es inválido', () => {
    const emitSpy = vi.spyOn(component.output, 'emit');
    component.onSubmit();
    expect(emitSpy).not.toHaveBeenCalled();
  });

  it('Debería emitir el DTO de inicio de sesión cuando el formulario es válido', () => {
    const emitSpy = vi.spyOn(component.output, 'emit');
    const loginDto = { username: 'test', password: 'password123' };
    component.loginForm.setValue(loginDto);

    component.onSubmit();

    expect(emitSpy).toHaveBeenCalledWith(loginDto);
  });

  it('No debería deshabilitar el formulario cuando loading es true', async () => {
    fixture.componentRef.setInput('loading', true);
    await fixture.whenStable();
    expect(component.loginForm.disabled).toBe(true);
  });

  it('Debería habilitar el formulario cuando loading es false', async () => {
    fixture.componentRef.setInput('loading', true);
    await fixture.whenStable();
    fixture.componentRef.setInput('loading', false);
    await fixture.whenStable();
    expect(component.loginForm.enabled).toBe(true);
  });
});
