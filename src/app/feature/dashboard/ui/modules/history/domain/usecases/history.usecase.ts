import { inject, Injectable } from "@angular/core";
import { IHistoryRepository } from "../repositories/history.repository";
import { IHistory, IPaginatedResponse } from "../entities/history.entity";
import { Observable } from "rxjs";
import { IGeneralResponse } from "@app/shared/models/general_response.model";

@Injectable({
  providedIn: 'root'
})
export class HistoryUsecase {
   private readonly historyRepository = inject(IHistoryRepository);

   getHistory(accountId: number, page: number = 0, size: number = 5): Observable<IGeneralResponse<IPaginatedResponse<IHistory>>> {
    return this.historyRepository.getHistory(accountId, page, size);
   }
}
