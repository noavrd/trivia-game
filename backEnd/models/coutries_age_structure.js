'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Coutries_age_structure extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Coutries_age_structure.init({
    country: DataTypes.STRING,
    age_0_to_14_years: DataTypes.STRING,
    age_15_to_64_years: DataTypes.STRING,
    age_above_65_years: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Coutries_age_structure',
    underscored: true,
  });
  return Coutries_age_structure;
};