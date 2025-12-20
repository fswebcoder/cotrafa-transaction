import { Observable } from 'rxjs';
import { IGeneralResponse } from '@app/shared/models/general_response.model';
import { IHistory, IPaginatedResponse } from '../entities/history.entity';

export abstract class IHistoryRepository {
  abstract getHistory(accountId: number, page: number, size: number): Observable<IGeneralResponse<IPaginatedResponse<IHistory>>>;
}
