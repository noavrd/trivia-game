const { Op } = require('sequelize');
const sequelize = require('sequelize');
const { question } = require('./models');

// //get question type 1 - most
// question
//   .findAll({
//     order: sequelize.literal('rand()'),
//     limit: 1,
//     where: {
//       [Op.and]: [{ type: 1 }, { most_least: 'most' }],
//     },
//   })
//   .then((results) => console.log(results.map((result) => result.toJSON())));

//get question type 1 - least
let type1Least = question
  .findAll({
    order: sequelize.literal('rand()'),
    limit: 1,
    where: {
      [Op.and]: [{ type: 1 }, { most_least: 'least' }],
    },
  })
  .then((results) =>
    console.log(
      results.map((result) => [
        result.question,
        result.from_table,
        result.from_colum,
      ])
    )
  )
  .catch((err) => console.log(err));

// console.log(type1Least[0]);
