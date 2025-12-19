import { inject, Injectable } from "@angular/core";
import { IGeneralResponse } from "@app/shared/models/general_response.model";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "@app/enviromments/environment";
import { TransactionRequestDto } from "../../domain/dtos/transaction-request.dto";

@Injectable({
  providedIn: 'root'
})
export class TransactionsDatasourceService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.services.apiUrl;

  saveTransaction(request: TransactionRequestDto): Observable<IGeneralResponse<boolean>> {
    return this.http.post<IGeneralResponse<boolean>>(`${this.baseUrl}accounts/transfer`, request);
  }
}
