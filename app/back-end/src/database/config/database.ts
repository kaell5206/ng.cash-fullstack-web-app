// import { Sequelize } from 'sequelize'
// import 'dotenv/config'

// const dbName = process.env.DB_NAME as string;
// const dbUser = process.env.DB_USER as string;
// const dbHost = process.env.DB_HOST;
// const dbDriver = 'postgres';
// const dbPassword = process.env.DB_PASS;

// const sequelizeConnection = new Sequelize(dbName, dbUser, dbPassword, {
//   host: dbHost,
//   port: Number(process.env.DB_PORT) || 3002,
//   dialect: dbDriver
// })

// export default sequelizeConnection

import 'dotenv/config';
import { Options } from 'sequelize';

const config: Options = {
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || 'password',
  database: 'NG_CASH',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 3002,
  dialect: 'postgres',
  dialectOptions: {
    timezone: 'Z',
  },
}

module.exports = config;