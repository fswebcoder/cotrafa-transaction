import { ILoginResponseDto, IAccountDto, IUserDto } from "@app/shared/dtos/user-response.dto";
import { IUser } from "@app/shared/entities/user.entity";
import { IAccount } from "@app/shared/entities/accounts.entity";

export function toUserEntity(loginDto: ILoginResponseDto): IUser {
  return {
    ...toUserFromDto(loginDto.user),
    token: loginDto.token
  };
}

export function toUserFromDto(userDto: IUserDto): IUser {
  return {
    user_id: userDto.id,
    user_name: userDto.name,
    last_name: userDto.lastName,
    document_type: userDto.documentType,
    document_number: userDto.documentNumber,
    user_accounts: userDto.accounts.map(toAccountEntity)
  };
}

export function toUserListEntity(usersDto: IUserDto[]): IUser[] {
  return usersDto.map(toUserFromDto);
}

export function toAccountEntity(accountDto: IAccountDto): IAccount {
  return {
    account_id: accountDto.id,
    account_number: accountDto.accountNumber,
    account_alias: accountDto.alias,
    account_balance: accountDto.balance
  };
}

export function toAccountListEntity(accountsDto: IAccountDto[] = []): IAccount[] {
  return accountsDto.map(toAccountEntity);
}
