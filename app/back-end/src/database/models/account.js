'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Account extends Model {
  }
  Account.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    balance: {
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'Account',
    timestamps: false
  });
  return Account;
};