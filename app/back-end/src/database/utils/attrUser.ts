import { INTEGER, STRING } from 'sequelize'

const attrUser = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: INTEGER
  },
  username: {
    allowNull: false,
    type: STRING
  },
  password: {
    allowNull: false,
    type: STRING
  },
  accountId: {
    type: STRING,
    references: {
      model: 'accounts',
      key: 'id'
    }
  }
}

export default attrUser;
