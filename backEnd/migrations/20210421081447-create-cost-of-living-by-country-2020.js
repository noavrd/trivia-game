'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('CostOfLivingByCountry2020s', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      country: {
        type: Sequelize.STRING
      },
      cost_of_living_index: {
        type: Sequelize.INTEGER
      },
      rent_index: {
        type: Sequelize.INTEGER
      },
      cost_of_living_plus_rent_index: {
        type: Sequelize.INTEGER
      },
      groceries_index: {
        type: Sequelize.INTEGER
      },
      restaurant_price_index: {
        type: Sequelize.INTEGER
      },
      local_purchasing_power_index: {
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
    await queryInterface.dropTable('CostOfLivingByCountry2020s');
  }
};