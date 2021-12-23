'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('CourseMaterials', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      file: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      classId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Classes',
          id: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('CourseMaterials');
  }
};