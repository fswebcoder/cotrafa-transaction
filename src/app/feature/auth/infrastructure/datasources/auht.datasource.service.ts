import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "@app/enviromments/environment";
import { IGeneralResponse } from "@app/shared/models/general_response.model";
import { ILoginResponseDto } from "../../domain/dtos/user-response.dto";
import { LoginDto } from "../../domain/dtos/login.dto";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthDataSourceService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.services.apiUrl;

  login(loginDto: LoginDto): Observable<IGeneralResponse<ILoginResponseDto>> {
    return this.http.post<IGeneralResponse<ILoginResponseDto>>(`${this.baseUrl}/auth/login`, loginDto);
  }
}
    