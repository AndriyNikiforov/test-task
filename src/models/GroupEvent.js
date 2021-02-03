const { sequelize: Sequelize, DataTypes, Model } = require('../../config/db');

class GroupEvent extends Model {}

GroupEvent.init({
  title: DataTypes.STRING,
  description: DataTypes.TEXT,
  execute_date: DataTypes.DATE,
  group_id: DataTypes.INTEGER,
}, {
  sequelize: Sequelize,
  modelName: 'GroupEvent',
  tableName: 'groups_events',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

module.exports = GroupEvent;
