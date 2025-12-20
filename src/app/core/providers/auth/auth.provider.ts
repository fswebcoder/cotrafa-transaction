
import { Provider } from '@angular/core';
import { IAuthRepository } from '@app/feature/auth/domain/repositories/auth.repository';
import { AuthRepositoryImp } from '@app/feature/auth/infrastructure/repositories/auth.repository_imp';

export function authProvider(): Provider[] {
  return [
    {
      provide: IAuthRepository,
      useClass: AuthRepositoryImp
    }
  ];
}
