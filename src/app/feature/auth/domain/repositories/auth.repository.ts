import { IGeneralResponse } from "@app/shared/models/general_response.model";
import { LoginDto } from "../dtos/login.dto";
import { IUser } from "../entities/user.entity";

export abstract class IAuthRepository {
  abstract login(loginDto: LoginDto): Promise<IGeneralResponse<IUser>>;
}