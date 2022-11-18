import { Model, DataTypes } from 'sequelize';
import { IAccount } from '../../Interfaces/IUser';
import db from '.'

  export default class Account extends Model<IAccount> implements IAccount {
    id!: number;
    balance!: number;
  }

  Account.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    balance: {
      type: DataTypes.FLOAT,
      defaultValue: 100.00
    }
  }, {
    sequelize: db,
    modelName: 'Accounts',
    timestamps: false
  });