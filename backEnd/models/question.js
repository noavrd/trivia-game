'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class question extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  question.init(
    {
      question: DataTypes.STRING,
      from_table: DataTypes.STRING,
      from_colum: DataTypes.STRING,
      type: DataTypes.INTEGER,
      rate: DataTypes.INTEGER,
      most_least: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'question',
      tableName: 'questions',
      underscored: true,
    }
  );
  return question;
};
