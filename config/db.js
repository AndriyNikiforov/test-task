const { Sequelize, DataTypes, Model } = require('sequelize');
const dotenv = require('dotenv');

const config = require('./config.json');

dotenv.config();
const { NODE_ENV } = process.env;

const sequelize = new Sequelize(
  config[NODE_ENV].database,
  config[NODE_ENV].username,
  config[NODE_ENV].password,
  {
    dialect: 'postgres',
    host: 'postgres',
    port: 5432,
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
);

sequelize.authenticate()
  .then(() => {
    console.log('Success');
  })
  .catch((error) => {
    console.log(error);
  });

module.exports = {
  sequelize,
  DataTypes,
  Model,
};
