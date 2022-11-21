export interface ITransaction {
  id?: number;
  debitedAccountId: number | undefined;
  creditedAccountId: number | undefined;
  value: number
  createdAt?: Date
}

export interface ITransacBody {
  creditedUser: string;
  value: number;
}