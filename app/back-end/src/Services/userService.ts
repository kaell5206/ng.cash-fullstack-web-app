import { IUser, IUserBody } from '../Interfaces/IUser';
import User from '../database/models/user'
import { NotFoundError } from '../Errors';
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
      if (check) throw new NotFoundError("Usuario já existe.");
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

  // public static async register() {

  // }

  // public async findAll(): Promise<IUser[]> {
  //   const get = await this.user.findAll();
  //   return get;
  // }

  // public async findOne(_id: number): Promise<IUser> {
  //   const get = await this.user.findOne({ where:  { _id } }, { raw: true });
  //   if (!get) {
  //     throw new Error("User not found")
  //   }
  //   return get;
  // }

  // public async update(_id: number, obj: IUser): Promise<IUser> {
  //   const update = await this.user.update({ where: { _id }}, obj)
  //   return update
  // }

  // public async destroy(_id: number): Promise<IUser> {
  //   const del = await this.user.destroy({ where: { _id }})
  //   return del;
  // }
}
