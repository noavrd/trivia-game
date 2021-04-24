'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('population_density_by_countries', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      rank: {
        type: Sequelize.INTEGER,
      },
      country: {
        type: Sequelize.STRING,
      },
      aria_km2: {
        type: Sequelize.STRING,
      },
      aria_mi2: {
        type: Sequelize.STRING,
      },
      population: {
        type: Sequelize.STRING,
      },
      density_pop_km2: {
        type: Sequelize.STRING,
      },
      density_pop_mi2: {
        type: Sequelize.STRING,
      },
      date: {
        type: Sequelize.STRING,
      },
      population_source: {
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
    await queryInterface.dropTable('population_density_by_countries');
  },
};
