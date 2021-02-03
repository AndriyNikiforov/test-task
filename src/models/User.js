const { sequelize: Sequelize, DataTypes, Model } = require('../../config/db');

class User extends Model { }

User.init({
  username: DataTypes.STRING,
  password: DataTypes.STRING,
  email: DataTypes.STRING,
  bio: DataTypes.TEXT,
  additional_info: DataTypes.JSON,
}, {
  sequelize: Sequelize,
  modelName: 'User',
  tableName: 'users',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

module.exports = User;
