import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IGeneralResponse } from '@app/shared/models/general_response.model';
import { ITransactionsRepository } from '../../domain/repositories/transactions.repository';
import { TransactionRequestDto } from '../../domain/dtos/transaction-request.dto';
import { TransactionsDatasourceService } from '../datasources/transactions.datasource.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionsRepositoryImp implements ITransactionsRepository {
  private readonly transactionsDatasource = inject(TransactionsDatasourceService);

  saveTransaction(request: TransactionRequestDto): Observable<IGeneralResponse<boolean>> {
    return this.transactionsDatasource.saveTransaction(request);
  }
}
