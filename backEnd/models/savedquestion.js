'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class savedQuestion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  savedQuestion.init(
    {
      question_name: DataTypes.STRING,
      answer_name: DataTypes.STRING,
      option1: DataTypes.STRING,
      option2: DataTypes.STRING,
      option3: DataTypes.STRING,
      rate1: DataTypes.INTEGER,
      rate2: DataTypes.INTEGER,
      rate3: DataTypes.INTEGER,
      rate4: DataTypes.INTEGER,
      rate5: DataTypes.INTEGER,
      average_rate: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'savedQuestion',
      tableName: 'savedQuestions',
      underscored: true,
    }
  );
  return savedQuestion;
};
