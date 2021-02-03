const { sequelize: Sequelize, DataTypes, Model } = require('../../config/db');

class Manifest extends Model {}

Manifest.init({
  user_id: DataTypes.INTEGER,
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  base_text: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  slug: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  likes: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  viewed: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  published_at: DataTypes.DATE,
}, {
  sequelize: Sequelize,
  modelName: 'Manifest',
  tableName: 'manifests',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

module.exports = Manifest;
