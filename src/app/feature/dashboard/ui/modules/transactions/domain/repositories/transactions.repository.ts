import { Observable } from 'rxjs';
import { IGeneralResponse } from '@app/shared/models/general_response.model';
import { TransactionRequestDto } from '../dtos/transaction-request.dto';

export abstract class ITransactionsRepository {
  abstract saveTransaction(request: TransactionRequestDto): Observable<IGeneralResponse<boolean>>;
}
