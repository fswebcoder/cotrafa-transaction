import { inject } from "@angular/core";
import { IAuthRepository } from "../../domain/repositories/auth.repository";
import { AuthDataSourceService } from "../datasources/auht.datasource.service";
import { LoginDto } from "../../domain/dtos/login.dto";
import { IGeneralResponse } from "@app/shared/models/general_response.model";
import { IUser } from "../../domain/entities/user.entity";
import { toUserEntity } from "../../domain/mapper/user.mapper";

export class AuthRepositoryImp implements IAuthRepository {
  private readonly authDataSourceService = inject(AuthDataSourceService);

  async login(loginDto: LoginDto): Promise<IGeneralResponse<IUser>> {
    const response = await this.authDataSourceService.login(loginDto);
    return {
      ...response,
      data: toUserEntity(response.data)
    };
  }
}