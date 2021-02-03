const { sequelize: Sequelize, DataTypes, Model } = require('../../config/db');

class View extends Model {}

View.init({
  entity_id: DataTypes.INTEGER,
  ip: DataTypes.STRING,
}, {
  sequelize: Sequelize,
  modelName: 'View',
  tableName: 'views',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

module.exports = View;
