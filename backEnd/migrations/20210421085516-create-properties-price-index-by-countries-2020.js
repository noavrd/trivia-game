'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('properties_price_index_by_countries_2020s', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      country: {
        type: Sequelize.STRING
      },
      price_to_income_ratio: {
        type: Sequelize.INTEGER
      },
      gross_rental_yield_city_centre: {
        type: Sequelize.INTEGER
      },
      gross_rental_yield_outside_of_centre: {
        type: Sequelize.INTEGER
      },
      price_to_rent_ratio_city_centre: {
        type: Sequelize.INTEGER
      },
      price_to_rent_ratio_outside_of_city_centre: {
        type: Sequelize.INTEGER
      },
      mortgage_as_a_percentage_of_income: {
        type: Sequelize.INTEGER
      },
      affordability_index: {
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
    await queryInterface.dropTable('properties_price_index_by_countries_2020s');
  }
};