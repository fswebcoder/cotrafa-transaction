import { ILoginResponseDto, IAccountDto } from "../dtos/user-response.dto";
import { IUser } from "../entities/user.entity";
import { IAccount } from "../entities/accounts.entity";

export function toUserEntity(loginDto: ILoginResponseDto): IUser {
  return {
    user_id: loginDto.user.id,
    user_name: loginDto.user.name,
    last_name: loginDto.user.lastName,
    document_type: loginDto.user.documentType,
    document_number: loginDto.user.documentNumber,
    user_accounts: loginDto.user.accounts.map(toAccountEntity),
    token: loginDto.token
  };
}

function toAccountEntity(accountDto: IAccountDto): IAccount {
  return {
    account_id: accountDto.id,
    account_number: accountDto.accountNumber,
    account_alias: accountDto.alias,
    account_balance: accountDto.balance
  };
}