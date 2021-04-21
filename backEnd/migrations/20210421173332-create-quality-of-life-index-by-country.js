'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('quality_of_life_index_by_countries', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      country: {
        type: Sequelize.STRING
      },
      quality_of_life_index: {
        type: Sequelize.INTEGER
      },
      purchasing_power_index: {
        type: Sequelize.INTEGER
      },
      safety_index: {
        type: Sequelize.INTEGER
      },
      health_care_index: {
        type: Sequelize.INTEGER
      },
      cost_of_living_index: {
        type: Sequelize.INTEGER
      },
      property_price_to_income_ratio: {
        type: Sequelize.INTEGER
      },
      traffic_commute_time_index: {
        type: Sequelize.INTEGER
      },
      pollution_index: {
        type: Sequelize.INTEGER
      },
      climate_index: {
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
    await queryInterface.dropTable('quality_of_life_index_by_countries');
  }
};