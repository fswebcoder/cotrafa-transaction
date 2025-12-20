import { IGeneralResponse } from "@app/shared/models/general_response.model";
import { LoginDto } from "../dtos/login.dto";
import { IUser } from "@app/shared/entities/user.entity";
import { Observable } from "rxjs";

export abstract class IAuthRepository {
  abstract login(loginDto: LoginDto): Observable<IGeneralResponse<IUser>>;
}