import { IUser } from "@app/shared/entities/user.entity";
import { IGeneralResponse } from "@app/shared/models/general_response.model";
import { Observable } from "rxjs";

export abstract class IUsersRepository {
  abstract getUsers(): Observable<IGeneralResponse<IUser[]>>;
}