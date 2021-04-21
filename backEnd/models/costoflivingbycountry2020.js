'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CostOfLivingByCountry2020 extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CostOfLivingByCountry2020.init(
    {
      country: DataTypes.STRING,
      cost_of_living_index: DataTypes.INTEGER,
      rent_index: DataTypes.INTEGER,
      cost_of_living_plus_rent_index: DataTypes.INTEGER,
      groceries_index: DataTypes.INTEGER,
      restaurant_price_index: DataTypes.INTEGER,
      local_purchasing_power_index: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'CostOfLivingByCountry2020',
      tableName: 'CostOfLivingByCountry2020s',
      underscored: true,
    }
  );
  return CostOfLivingByCountry2020;
};
