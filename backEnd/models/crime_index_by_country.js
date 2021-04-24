'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Crime_index_by_country extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Crime_index_by_country.init(
    {
      country: DataTypes.STRING,
      crime_index: DataTypes.STRING,
      safety_index: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Crime_index_by_country',
      tableName: 'Crime_index_by_countries',
      underscored: true,
    }
  );
  return Crime_index_by_country;
};
