import { inject, Injectable } from "@angular/core";
import { IAuthRepository } from "../repositories/auth.repository";
import { LoginDto } from "../dtos/login.dto";
import { IGeneralResponse } from "@app/shared/models/general_response.model";
import { IUser } from "../entities/user.entity";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthUseCase {
  private readonly authRepository = inject(IAuthRepository);

  login(loginDto: LoginDto): Observable<IGeneralResponse<IUser>> {
    return this.authRepository.login(loginDto);
  }
 
}