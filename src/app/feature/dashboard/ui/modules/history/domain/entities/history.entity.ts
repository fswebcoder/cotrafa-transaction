export interface IAccountSummary {
  id: number;
  accountNumber: string;
  alias: string;
  balance: number;
}

export interface IHistory {
  id: number;
  sourceAccount: IAccountSummary;
  destinationAccount: IAccountSummary;
  movement?: 'ENTRADA' | 'SALIDA';
  amount: number;
  cus: string;
  status: string;
  timestamp: string;
}

export interface IPaginatedResponse<T> {
  content: T[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
  first: boolean;
}
