import { Provider } from '@angular/core';
import { IHistoryRepository } from '@app/feature/dashboard/ui/modules/history/domain/repositories/history.repository';
import { HistoryRepositoryImp } from '@app/feature/dashboard/ui/modules/history/instrastructure/repositories/history.repository_imp';

export function historyProvider(): Provider[] {
  return [
    {
      provide: IHistoryRepository,
      useClass: HistoryRepositoryImp
    }
  ];
}
