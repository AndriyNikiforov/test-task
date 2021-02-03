const { sequelize: Sequelize, DataTypes, Model } = require('../../config/db');

class Group extends Model {}

Group.init({
  slug: DataTypes.STRING,
  description: DataTypes.TEXT,
  owner_id: DataTypes.INTEGER,
}, {
  sequelize: Sequelize,
  tableName: 'groups',
  modelName: 'Group',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

module.exports = Group;
