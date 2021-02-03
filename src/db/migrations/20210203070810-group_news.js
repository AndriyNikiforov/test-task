module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('group_news', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      group_id: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: 'groups',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      title: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
      },
      base_text: {
        type: Sequelize.DataTypes.TEXT,
        allowNull: true,
      },
      slug: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      like: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      viewed: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      published_at: Sequelize.DataTypes.DATE,
      created_at: Sequelize.DataTypes.DATE,
      updated_at: Sequelize.DataTypes.DATE,
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('group_news');
  },
};
