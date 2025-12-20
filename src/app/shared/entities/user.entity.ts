import { IAccount } from "./accounts.entity";

export interface IUser {
  user_id: number;
  user_name: string;
  last_name: string;
  document_type: string;
  document_number?: string;
  user_accounts: IAccount[];
  token?: string;
}
