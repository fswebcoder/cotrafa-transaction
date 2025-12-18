import { Provider } from '@angular/core';
import { IUsersRepository } from '@app/feature/dashboard/ui/modules/transactions/domain/repositories/users.repository';
import { UsersRepositoryImp } from '@app/feature/dashboard/ui/modules/transactions/instrastructure/repositories/users.repository_imp';
import { ITransactionsRepository } from '@app/feature/dashboard/ui/modules/transactions/domain/repositories/transactions.repository';
import { TransactionsRepositoryImp } from '@app/feature/dashboard/ui/modules/transactions/instrastructure/repositories/transactions.repository_imp';

export function transactionProvider(): Provider[] {
  return [
    {
      provide: IUsersRepository,
      useClass: UsersRepositoryImp
    },
    {
      provide: ITransactionsRepository,
      useClass: TransactionsRepositoryImp
    }
  ];
}
