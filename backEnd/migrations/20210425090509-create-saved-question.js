'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('savedQuestions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      question_name: {
        type: Sequelize.STRING,
      },
      answer_name: {
        type: Sequelize.STRING,
      },
      option1: {
        type: Sequelize.STRING,
      },
      option2: {
        type: Sequelize.STRING,
      },
      option3: {
        type: Sequelize.STRING,
      },
      rate1: {
        type: Sequelize.INTEGER,
      },
      rate2: {
        type: Sequelize.INTEGER,
      },
      rate3: {
        type: Sequelize.INTEGER,
      },
      rate4: {
        type: Sequelize.INTEGER,
      },
      rate5: {
        type: Sequelize.INTEGER,
      },
      average_rate: {
        type: Sequelize.STRING,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('savedQuestions');
  },
};
