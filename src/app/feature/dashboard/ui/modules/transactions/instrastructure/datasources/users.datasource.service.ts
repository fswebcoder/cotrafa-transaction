import { inject, Injectable } from "@angular/core";
import { IGeneralResponse } from "@app/shared/models/general_response.model";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "@app/enviromments/environment";
import { IUserDto } from "@app/shared/dtos/user-response.dto";

@Injectable({
  providedIn: 'root'
})
export class UsersDatasourceService  {
 private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.services.apiUrl;

  getUsers(): Observable<IGeneralResponse<IUserDto[]>> {
    return this.http.get<IGeneralResponse<IUserDto[]>>(`${this.baseUrl}users`);
  }
}
