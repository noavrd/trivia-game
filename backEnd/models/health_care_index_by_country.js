'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class health_care_index_by_country extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  health_care_index_by_country.init({
    country: DataTypes.STRING,
    health_care_index: DataTypes.INTEGER,
    health_care_exp_index: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'health_care_index_by_country',
    tableName: 'health_care_index_by_countries',
    underscored: true,
  });
  return health_care_index_by_country;
};