import { inject, Injectable } from "@angular/core";
import { IUsersRepository } from "../repositories/users.repository";
import { IUser } from "@app/shared/entities/user.entity";
import { Observable } from "rxjs";
import { IGeneralResponse } from "@app/shared/models/general_response.model";

@Injectable({
  providedIn: 'root'
})
export class UsersUsecase implements IUsersRepository {
   iUsersRepository = inject(IUsersRepository);

   getUsers():Observable<IGeneralResponse<IUser[]>>{
    return this.iUsersRepository.getUsers();
   }
}