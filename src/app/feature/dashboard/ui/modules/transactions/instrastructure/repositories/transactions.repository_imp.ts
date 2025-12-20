import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IGeneralResponse } from '@app/shared/models/general_response.model';
import { ITransactionsRepository } from '../../domain/repositories/transactions.repository';
import { TransactionRequestDto } from '../../domain/dtos/transaction-request.dto';
import { TransactionsDatasourceService } from '../datasources/transactions.datasource.service';
import { IAccount } from '@app/shared/entities/accounts.entity';
import { map } from 'rxjs/operators';
import { toAccountListEntity } from '@app/shared/mappers/user.mapper';

@Injectable({
  providedIn: 'root'
})
export class TransactionsRepositoryImp implements ITransactionsRepository {
  private readonly transactionsDatasource = inject(TransactionsDatasourceService);

  saveTransaction(request: TransactionRequestDto): Observable<IGeneralResponse<boolean>> {
    return this.transactionsDatasource.saveTransaction(request);
  }

  depositToAccount(request: { accountNumber: string; amount: number }): Observable<IGeneralResponse<boolean>> {
    return this.transactionsDatasource.depositToAccount(request);
  }

  getAccountsByUser(userId: number): Observable<IGeneralResponse<IAccount[]>> {
    return this.transactionsDatasource.getAccountsByUser(userId).pipe(
      map((response) => ({
        ...response,
        data: toAccountListEntity(response.data)
      }))
    );
  }
}
