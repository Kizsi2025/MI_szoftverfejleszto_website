// config/database.js
require('dotenv').config();

module.exports = {
  development: {
    username: 'postgres',
    password: '123',
    database: 'szoftverfejlesztok',
    host: '127.0.0.1',
    port: 5432,
    dialect: 'postgres',
    logging: console.log,
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    logging: false,
  }
};
