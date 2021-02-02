module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      username: Sequelize.DataTypes.STRING,
      password: Sequelize.DataTypes.STRING,
      email: Sequelize.DataTypes.STRING,
      bio: Sequelize.DataTypes.TEXT,
      tags: Sequelize.DataTypes.TSVECTOR,
      team_id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: true,
      },
      additional_info: Sequelize.DataTypes.JSON,
      created_at: Sequelize.DataTypes.DATE,
      updated_at: Sequelize.DataTypes.DATE,
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('users');
  },
};
