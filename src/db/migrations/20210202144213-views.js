module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('views', {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      entity_id: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: 'manifests',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      ip: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      created_at: Sequelize.DataTypes.DATE,
      updated_at: Sequelize.DataTypes.DATE,
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('views');
  },
};
