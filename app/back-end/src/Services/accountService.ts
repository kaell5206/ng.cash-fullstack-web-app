import Account from '../database/models/account';
import { IAccount } from '../Interfaces/IUser';

export default class AccountService {
  public static async create(balance: number): Promise<IAccount> {
    const add = await Account.create({ balance },  { raw: true });
    return add;
  }
}