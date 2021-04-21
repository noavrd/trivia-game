'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class properties_price_index_by_2020_country extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  properties_price_index_by_2020_country.init(
    {
      country: DataTypes.STRING,
      price_to_income_ratio: DataTypes.INTEGER,
      gross_rental_yield_city_centre: DataTypes.INTEGER,
      gross_rental_yield_outside_of_centre: DataTypes.INTEGER,
      price_to_rent_ratio_city_centre: DataTypes.INTEGER,
      price_to_rent_ratio_outside_of_city_centre: DataTypes.INTEGER,
      mortgage_as_a_percentage_of_income: DataTypes.INTEGER,
      affordability_index: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'properties_price_index_by_2020_country',
      tableName: 'properties_price_index_by_2020_countries',
      underscored: true,
    }
  );
  return properties_price_index_by_2020_country;
};
