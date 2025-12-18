import { Provider } from '@angular/core';
import { IUsersRepository } from '@app/feature/dashboard/ui/modules/transactions/domain/repositories/users.repository';
import { UsersRepositoryImp } from '@app/feature/dashboard/ui/modules/transactions/instrastructure/repositories/users.repository_imp';

export function transactionProvider(): Provider[] {
  return [
    {
      provide: IUsersRepository,
      useClass: UsersRepositoryImp
    }
  ];
}
