require('dotenv').config()

const config = {
  development: {
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || 'password',
    database: 'NG_CASH',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 3002,
    dialect: 'postgres',
  }
}

module.exports = config
