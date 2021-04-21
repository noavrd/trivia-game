'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class population_density_by_countries extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  population_density_by_countries.init({
    rank: DataTypes.INTEGER,
    country: DataTypes.STRING,
    Aria_km2: DataTypes.INTEGER,
    Aria_mi2: DataTypes.INTEGER,
    population: DataTypes.STRING,
    density_pop_km2: DataTypes.STRING,
    density_pop_mi2: DataTypes.STRING,
    date: DataTypes.STRING,
    population_source: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'population_density_by_countries',
    underscored: true,
  });
  return population_density_by_countries;
};