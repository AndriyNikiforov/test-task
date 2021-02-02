const { sequelize: Sequelize, DataTypes, Model } = require('../../config/db');

class Token extends Model {}

Token.init({
  user_id: {
    type: DataTypes.INTEGER,
  },
  token: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
  },
  type: {
    type: DataTypes.STRING,
  },
  is_revoked: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
}, {
  sequelize: Sequelize,
  modelName: 'Token',
  tableName: 'tokens',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

module.exports = Token;
