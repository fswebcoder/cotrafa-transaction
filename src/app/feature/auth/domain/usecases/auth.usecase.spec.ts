import { TestBed } from '@angular/core/testing';
import { firstValueFrom, of } from 'rxjs';
import { vi } from 'vitest';

import { AuthUseCase } from './auth.usecase';
import { IAuthRepository } from '../repositories/auth.repository';

describe('AuthUseCase', () => {
  it('Debería delegar el inicio de sesión al repositorio', async () => {
    const repositoryMock = { login: vi.fn() };
    const response = { success: true, message: 'ok', data: null as any };
    repositoryMock.login.mockReturnValue(of(response));

    TestBed.configureTestingModule({
      providers: [{ provide: IAuthRepository, useValue: repositoryMock }, AuthUseCase]
    });

    const useCase = TestBed.inject(AuthUseCase);
    const result = await firstValueFrom(useCase.login({ username: 'u', password: 'p' }));

    expect(repositoryMock.login).toHaveBeenCalledWith({ username: 'u', password: 'p' });
    expect(result).toEqual(response);
  });
});

