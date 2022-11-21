import { Op, Sequelize } from 'sequelize';
import Transaction from "../database/models/transaction";
import { ITransacBody, ITransaction } from "../Interfaces/ITransaction";
import * as config from '../database/config/database';
import UserService from './userService';
import AccountService from './accountService';
import Account from '../database/models/account';
import { ConflictError } from '../Errors';
import User from '../database/models/user';

const sequelize = new Sequelize(config)

export default class TransactionService {
  public static async create(body: ITransacBody, userId: number ): Promise<ITransaction> {
    const { creditedUser, value } = body;
    const result = sequelize.transaction( async (t) => {
      const checkCredited = await UserService.checkExists(creditedUser);
      const userBalance =  await AccountService.getBalance(userId);
      if (userId === checkCredited.id) throw new ConflictError("Não pode transferir para si.")
      if (Number(userBalance.balance) < Number(value)) throw new ConflictError("Saldo insuficiente.")
      const creditedNewBalance = Number(checkCredited.balance) + Number(value);
      const userNewBalance = Number(userBalance.balance) - Number(value);
      await Account.update({ balance: creditedNewBalance }, { where: { id: checkCredited.id }, transaction: t });
      await Account.update({ balance: userNewBalance }, { where: { id: userBalance.id }, transaction: t });
      const add = await Transaction.create({ debitedAccountId: userBalance.id,
      creditedAccountId: checkCredited.id, value}, { raw: true , transaction: t });
      return add;
    })
    return result;
  }

  public static async findAll(id: number): Promise<ITransaction[]> {
    const get =  await Transaction.findAll({ where: { [Op.or]: [{ debitedAccountId: id},
    { creditedAccountId: id }]},
     include: [{ model: User, as: "credited", attributes: ['username'] },
    { model: User, as: "debited", attributes: ['username'] }]})
    return get;
  }
}