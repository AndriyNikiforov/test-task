const { sequelize: Sequelize, DataTypes, Model } = require('../../config/db');

class Like extends Model {}

Like.init({
  entity_id: DataTypes.INTEGER,
  user_id: DataTypes.INTEGER,
}, {
  sequelize: Sequelize,
  modelName: 'Like',
  tableName: 'likes',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

module.exports = Like;
