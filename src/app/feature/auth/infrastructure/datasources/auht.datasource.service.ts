import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "@app/enviromments/environment";
import { IGeneralResponse } from "@app/shared/models/general_response.model";
import { ILoginResponseDto } from "../../domain/dtos/user-response.dto";
import { LoginDto } from "../../domain/dtos/login.dto";

@Injectable({
  providedIn: 'root'
})
export class AuthDataSourceService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.services.apiUrl;

  async login(loginDto: LoginDto): Promise<IGeneralResponse<ILoginResponseDto>> {
    const response = await this.http.post<IGeneralResponse<ILoginResponseDto>>(`${this.baseUrl}/auth/login`, loginDto).toPromise();
    if (!response) {
      throw new Error('No response from server');
    }
    return response;
  }
}
    