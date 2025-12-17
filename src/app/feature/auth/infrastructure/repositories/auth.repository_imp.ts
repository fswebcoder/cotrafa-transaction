import { inject } from "@angular/core";
import { IAuthRepository } from "../../domain/repositories/auth.repository";
import { AuthDataSourceService } from "../datasources/auht.datasource.service";
import { LoginDto } from "../../domain/dtos/login.dto";
import { IGeneralResponse } from "@app/shared/models/general_response.model";
import { IUser } from "../../domain/entities/user.entity";
import { toUserEntity } from "../../domain/mapper/user.mapper";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

export class AuthRepositoryImp implements IAuthRepository {
  private readonly authDataSourceService = inject(AuthDataSourceService);

  login(loginDto: LoginDto): Observable<IGeneralResponse<IUser>> {
    return this.authDataSourceService.login(loginDto).pipe(
      map(response => ({
        ...response,
        data: toUserEntity(response.data)
      }))
    );
  }
}