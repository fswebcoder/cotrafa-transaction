import { inject } from "@angular/core";
import { IUsersRepository } from "../../domain/repositories/users.repository";
import { UsersDatasourceService } from "../datasources/users.datasource.service";
import { IGeneralResponse } from "@app/shared/models/general_response.model";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { IUser } from "@app/shared/entities/user.entity";
import { toUserListEntity } from "@app/shared/mappers/user.mapper";

export class UsersRepositoryImp implements IUsersRepository {
  private readonly usersDatasourceService = inject(UsersDatasourceService);

  getUsers(): Observable<IGeneralResponse<IUser[]>> {
    return this.usersDatasourceService.getUsers().pipe(
      map((response) => ({
        ...response,
        data: toUserListEntity(response.data)
      }))
    );
  }
}