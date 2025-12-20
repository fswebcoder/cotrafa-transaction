import { TestBed } from '@angular/core/testing';
import { firstValueFrom, of } from 'rxjs';
import { vi } from 'vitest';

import { AuthRepositoryImp } from './auth.repository_imp';
import { IAuthRepository } from '../../domain/repositories/auth.repository';
import { AuthDataSourceService } from '../datasources/auht.datasource.service';

describe('AuthRepositoryImp', () => {
  it('should map login response dto to user entity', async () => {
    const dataSourceMock = { login: vi.fn() };

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthDataSourceService, useValue: dataSourceMock },
        { provide: IAuthRepository, useClass: AuthRepositoryImp }
      ]
    });

    const repository = TestBed.inject(IAuthRepository);
    const dtoResponse = {
      success: true,
      message: 'ok',
      data: {
        token: 'token',
        user: {
          id: 1,
          name: 'Juan',
          lastName: 'Perez',
          documentType: 'CC',
          documentNumber: '123',
          accounts: []
        }
      }
    };

    dataSourceMock.login.mockReturnValue(of(dtoResponse));

    const result = await firstValueFrom(repository.login({ username: 'u', password: 'p' }));

    expect(dataSourceMock.login).toHaveBeenCalledWith({ username: 'u', password: 'p' });
    expect(result.success).toBe(true);
    expect(result.data).toEqual({
      user_id: 1,
      user_name: 'Juan',
      last_name: 'Perez',
      document_type: 'CC',
      document_number: '123',
      user_accounts: [],
      token: 'token'
    });
  });
});

