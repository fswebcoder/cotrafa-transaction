export interface TransactionRequestDto {
  sourceAccountNumber: string;
  destinationAccountNumber: string;
  amount: number;
  cus: string;
}

export type TransactionFormOutput = Omit<TransactionRequestDto, 'cus'> & { 
  beneficiaryId: number; 
  beneficiaryName: string 
};
