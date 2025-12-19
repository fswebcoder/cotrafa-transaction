import { inject, Injectable } from "@angular/core";
import { IGeneralResponse } from "@app/shared/models/general_response.model";
import { Observable } from "rxjs";
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "@app/enviromments/environment";
import { IHistory, IPaginatedResponse } from "../../domain/entities/history.entity";

@Injectable({
  providedIn: 'root'
})
export class HistoryDatasourceService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.services.apiUrl;

  getHistory(accountId: number, page: number, size: number): Observable<IGeneralResponse<IPaginatedResponse<IHistory>>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<IGeneralResponse<IPaginatedResponse<IHistory>>>(
      `${this.baseUrl}accounts/user/${accountId}/transactions`,
      { params }
    );
  }
}
