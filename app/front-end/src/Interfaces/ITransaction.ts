export interface ITransaction {
  id: number;
  debitedAccountId: number;
  creditedAccountId: number;
  debited: { username: string };
  credited: { username: string };
  value: string;
  createdAt: string;
}
