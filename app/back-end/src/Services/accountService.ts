import { DontExistError } from '../Errors';
import Account from '../database/models/account';
import { IAccount } from '../Interfaces/IUser';

export default class AccountService {
  public static async create(balance: number): Promise<IAccount> {
    const add = await Account.create({ balance },  { raw: true });
    return add;
  }

  public static async getBalance(accountId: number): Promise<IAccount> {
    const get =  await Account.findOne({ where: { id: accountId }})
    if (!get) throw new DontExistError("Conta não encontrada")
    return get;
  }
}