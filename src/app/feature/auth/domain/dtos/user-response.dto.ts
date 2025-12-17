export interface IAccountDto {
  id: number;
  accountNumber: string;
  alias: string;
  balance: number;
}

export interface IUserDto {
  id: number;
  name: string;
  lastName: string;
  documentType: string;
  documentNumber?: string;
  accounts: IAccountDto[];
}

export interface ILoginResponseDto {
  token: string;
  user: IUserDto;
}

