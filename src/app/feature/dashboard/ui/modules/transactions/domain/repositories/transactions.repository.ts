import { Observable } from 'rxjs';
import { IGeneralResponse } from '@app/shared/models/general_response.model';
import { TransactionRequestDto } from '../dtos/transaction-request.dto';
import { IAccount } from '@app/shared/entities/accounts.entity';

export abstract class ITransactionsRepository {
  abstract saveTransaction(request: TransactionRequestDto): Observable<IGeneralResponse<boolean>>;
  abstract depositToAccount(request: { accountNumber: string; amount: number }): Observable<IGeneralResponse<boolean>>;
  abstract getAccountsByUser(userId: number): Observable<IGeneralResponse<IAccount[]>>;
}
