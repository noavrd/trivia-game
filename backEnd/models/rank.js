'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class rank extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  rank.init(
    {
      question: DataTypes.STRING,
      rank_1: DataTypes.INTEGER,
      rank_2: DataTypes.INTEGER,
      rank_3: DataTypes.INTEGER,
      rank_4: DataTypes.INTEGER,
      rank_5: DataTypes.INTEGER,
      average: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'rank',
      tableName: 'ranks',
      underscored: true,
    }
  );
  return rank;
};
