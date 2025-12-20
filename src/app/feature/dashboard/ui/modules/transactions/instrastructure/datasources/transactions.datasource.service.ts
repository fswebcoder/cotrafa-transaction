import { inject, Injectable } from "@angular/core";
import { IGeneralResponse } from "@app/shared/models/general_response.model";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "@app/enviromments/environment";
import { TransactionRequestDto } from "../../domain/dtos/transaction-request.dto";
import { IAccountDto } from "@app/shared/dtos/user-response.dto";

@Injectable({
  providedIn: 'root'
})
export class TransactionsDatasourceService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.services.apiUrl;

  saveTransaction(request: TransactionRequestDto): Observable<IGeneralResponse<boolean>> {
    return this.http.post<IGeneralResponse<boolean>>(`${this.baseUrl}accounts/transfer`, request);
  }

  depositToAccount(request: { accountNumber: string; amount: number }): Observable<IGeneralResponse<boolean>> {
    return this.http.post<IGeneralResponse<boolean>>(`${this.baseUrl}accounts/deposit`, request);
  }

  getAccountsByUser(userId: number): Observable<IGeneralResponse<IAccountDto[]>> {
    return this.http.get<IGeneralResponse<IAccountDto[]>>(`${this.baseUrl}accounts/user/${userId}`);
  }
}
