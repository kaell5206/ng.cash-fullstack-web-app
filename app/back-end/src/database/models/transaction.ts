import {
  Model, DataTypes
} from 'sequelize'
import { ITransaction } from '../../Interfaces/ITransaction';
import db from "."
import User from './user';
import Account from './account';

  export default class Transaction extends Model<ITransaction> implements ITransaction {
    id!: number;
    debitedAccountId!: number;
    creditedAccountId!: number;
    value!: number;
    createdAt: Date;
  }

  Transaction.init({
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      debitedAccountId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'Accounts',
          key: "id"
        }
      },
      creditedAccountId : {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'Accounts',
          key: "id"
        }
      },
      value: {
        allowNull: false,
        type: DataTypes.DECIMAL(12, 2)
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
  }, {
    sequelize: db,
    modelName: 'Transactions',
    createdAt: true,
    updatedAt: false
  });

// Transaction.belongsToMany(User, { through: Account, foreignKey: 'creditedAccountId' })

// Transaction.belongsToMany(User, { through: Account, foreignKey: 'debitedAccountId' })

// Account.hasMany( Transaction, {
//   foreignKey: "debitedAccountId", as: "debitedUser"
// })

// Account.hasMany( Transaction, {
//   foreignKey: "creditedAccountId", as: "creditedUser"
// })

Transaction.belongsTo(User, { foreignKey: 'debitedAccountId', as: 'debited'})

Transaction.belongsTo(User, { foreignKey: 'creditedAccountId', as: 'credited'})