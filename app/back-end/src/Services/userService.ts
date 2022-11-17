import { Model } from 'sequelize';
import { IModel } from '../Interfaces/IModel';
import IService from '../Interfaces/IService';
import { IUser } from '../Interfaces/IUser';
import User from '../database/models/user'

export default class UserService {
  public static async create(obj: IUser): Promise<IUser> {
    console.log('test');
    const add = await User.create(obj)
    return add;
  }

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
