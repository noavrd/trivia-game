'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class quality_of_life_index_by_countries extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  quality_of_life_index_by_countries.init({
    country: DataTypes.STRING,
    quality_of_life_index: DataTypes.INTEGER,
    purchasing_power_index: DataTypes.INTEGER,
    safety_index: DataTypes.INTEGER,
    health_care_index: DataTypes.INTEGER,
    cost_of_living_index: DataTypes.INTEGER,
    property_price_to_income_rario: DataTypes.INTEGER,
    traffic_commute_time_index: DataTypes.INTEGER,
    pollution_index: DataTypes.INTEGER,
    climate_index: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'quality_of_life_index_by_countries',
    underscored: true,
  });
  return quality_of_life_index_by_countries;
};