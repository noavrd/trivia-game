'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ranks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      question: {
        type: Sequelize.STRING
      },
      rank_1: {
        type: Sequelize.INTEGER
      },
      rank_2: {
        type: Sequelize.INTEGER
      },
      rank_3: {
        type: Sequelize.INTEGER
      },
      rank_4: {
        type: Sequelize.INTEGER
      },
      rank_5: {
        type: Sequelize.INTEGER
      },
      average: {
        type: Sequelize.INTEGER
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('ranks');
  }
};