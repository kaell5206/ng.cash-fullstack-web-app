import { IUser, IUserBody } from '../Interfaces/IUser';
import User from '../database/models/user'
import { ConflictError, DontExistError, ValidationError } from '../Errors';
import { Sequelize } from 'sequelize';
import * as config from '../database/config/database';
import md5 from 'md5';
import Account from '../database/models/account';

const sequelize = new Sequelize(config)

export default class UserService {
  public static async register(body: IUserBody): Promise<IUser> {
    const result = sequelize.transaction( async (t) => {
      const { username, password } = body
      const check = await User.findOne({ where: { username } })
      if (check) throw new ConflictError("Usuario já existe.");
      const { id } = await Account.create({ balance: 100.00 }, { transaction: t, raw: true });
      const user = await User.create({ username, password: md5(password), accountId: id },
      { transaction: t, raw: true })
      return { 
        id: user.id,
        username: user.username,
        accountId: user.accountId,
       };
    })
    return result
  }

  public static async login(body: IUser): Promise<IUser> {
    if (!body.password || !body.username) throw new ValidationError("Campos não podem estar vazios.")
    const { username, password } = body;
    const check = await User.findOne({ where: { username } }, );
    if (!check) throw new DontExistError("Usuario não encontrado.")
    if (check.password !== md5(password))  throw new DontExistError("Senha invalida.")
    return {
      id: check.id,
      username: check.username,
      accountId: check.accountId
    }
  }
}
