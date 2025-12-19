import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IGeneralResponse } from '@app/shared/models/general_response.model';
import { IHistoryRepository } from '../../domain/repositories/history.repository';
import { IHistory, IPaginatedResponse } from '../../domain/entities/history.entity';
import { HistoryDatasourceService } from '../datasources/history.datasource.service';

@Injectable({
  providedIn: 'root'
})
export class HistoryRepositoryImp implements IHistoryRepository {
  private readonly historyDatasource = inject(HistoryDatasourceService);

  getHistory(accountId: number, page: number, size: number): Observable<IGeneralResponse<IPaginatedResponse<IHistory>>> {
    return this.historyDatasource.getHistory(accountId, page, size);
  }
}
