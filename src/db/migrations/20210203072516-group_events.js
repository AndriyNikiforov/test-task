module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('group_events', {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: Sequelize.DataTypes.STRING,
      description: Sequelize.DataTypes.TEXT,
      execute_date: Sequelize.DataTypes.DATE,
      group_id: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: 'groups',
          key: 'id',
        },
      },
      created_at: Sequelize.DataTypes.DATE,
      updated_at: Sequelize.DataTypes.DATE,
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('group_events');
  },
};
