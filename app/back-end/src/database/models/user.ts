import { Model, DataTypes } from 'sequelize';
import { IUser } from '../../Interfaces/IUser';
import db from '.';

export default class User extends Model<IUser> implements IUser {
  id!: number;
  username!: string;
  password!: string;
  accountId!: number;
}

User.init({
  id: {
   primaryKey: true,
   allowNull: false,
   autoIncrement: true,
   type: DataTypes.NUMBER,
  },
  username: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING
  },
  accountId: {
    references: {
      model: "Accounts",
      key: "id"
    },
    type: DataTypes.NUMBER
  }
}, {
  sequelize: db,
  modelName: 'Users',
  timestamps: false,
});
