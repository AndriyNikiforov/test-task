const { sequelize: Sequelize, DataTypes, Model } = require('../../config/db');

class Attachment extends Model {}

Attachment.init({
  entity_id: DataTypes.INTEGER,
  path: DataTypes.STRING,
}, {
  sequelize: Sequelize,
  modelName: 'Attachment',
  tableName: 'attachments',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

module.exports = Attachment;
