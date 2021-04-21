'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class clipboard extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  clipboard.init(
    {
      name: DataTypes.STRING,
      score: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'clipboard',
      tableName: 'clipboards',
      underscored: true,
    }
  );
  return clipboard;
};
