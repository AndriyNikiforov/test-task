const { sequelize: Sequelize, DataTypes, Model } = require('../../config/db');
const { sequelize } = require('./Token');

class User extends Model { }

User.init({
  username: DataTypes.STRING,
  password: DataTypes.STRING,
  email: DataTypes.STRING,
  bio: DataTypes.TEXT,
  tags: DataTypes.TSVECTOR,
  team_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  additional_info: DataTypes.JSON,
}, {
  sequelize: Sequelize,
  modelName: 'User',
  tableName: 'users',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

User.beforeCreate(async (user) => {
  const { tags } = user;

  if (tags) {
    const readyData = tags.map((item) => `'${item}'`)
      .filter(Boolean)
      .join(" || ' ' || ");

    user.tags = sequelize.query(`to_tsvector(${readyData})`);
  }
});

module.exports = User;
