export interface ITransaction {
  id: string;
  sourceAccountId: number;
  beneficiaryId: number;
  beneficiaryName: string;
  amount: number;
  date: Date;
  cus: string;
  encryptedCus: string;
}
