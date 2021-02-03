const { sequelize: Sequelize, DataTypes, Model } = require('../../config/db');

class GroupInvited extends Model {}

GroupInvited.init({
  user_id: DataTypes.INTEGER,
  group_id: DataTypes.INTEGER,
  status: DataTypes.STRING,
}, {
  sequelize: Sequelize,
  modelName: 'GroupInvited',
  tableName: 'group_invites',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

module.exports = GroupInvited;
