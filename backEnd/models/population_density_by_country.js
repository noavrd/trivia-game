'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class population_density_by_country extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  population_density_by_country.init(
    {
      rank: DataTypes.INTEGER,
      country: DataTypes.STRING,
      aria_km2: DataTypes.STRING,
      aria_mi2: DataTypes.STRING,
      population: DataTypes.STRING,
      density_pop_km2: DataTypes.STRING,
      density_pop_mi2: DataTypes.STRING,
      date: DataTypes.STRING,
      population_source: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'population_density_by_country',
      tableName: 'population_density_by_countries',
      underscored: true,
    }
  );
  return population_density_by_country;
};
