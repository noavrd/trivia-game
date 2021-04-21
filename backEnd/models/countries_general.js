'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Countries_general extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Countries_general.init({
    country: DataTypes.STRING,
    region: DataTypes.STRING,
    coastline: DataTypes.INTEGER,
    net_migration: DataTypes.STRING,
    infant_motality: DataTypes.STRING,
    GDP: DataTypes.INTEGER,
    literacy: DataTypes.STRING,
    Phones: DataTypes.STRING,
    arable: DataTypes.STRING,
    crops: DataTypes.STRING,
    others: DataTypes.STRING,
    climate: DataTypes.INTEGER,
    birthrate: DataTypes.STRING,
    deathrate: DataTypes.STRING,
    agriculture: DataTypes.STRING,
    industy: DataTypes.STRING,
    service: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Countries_general',
    underscored: true,
  });
  return Countries_general;
};