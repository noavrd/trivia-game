const {
  Capital,
  costoflivingbycountry2020,
  Countries_general,
  coutries_age_structure,
  Crime_index_by_country,
  health_care_index_by_country,
  population_density_by_country,
  properties_price_index_by_2020_country,
  quality_of_life_index_by_country,
} = require('./models');
const { Sequelize, Op } = require('sequelize');

const firstTypeQuestions = [
  {
    key: ['most', 'least'],
    optionForKey: [
      {
        table: population_density_by_country,
        column: 'aria_km2',
        most: 'Which country is most densely populated?',
        least: 'Which country is least densely populated?',
      },
      {
        table: Countries_general,
        column: 'phones',
        most: 'Which country hat the most cell phones per person?',
        least: 'Which country hat the least cell phones per person?',
      },
      {
        table: population_density_by_country,
        column: 'population',
        most: 'Which country is most populous?',
        least: 'Which country is least populous?',
      },
      {
        table: Crime_index_by_country,
        column: 'crime_index',
        most: 'Which country has the most crime rate?',
        least: ' Which country has the least crime rate',
      },
    ],
  },
  {
    key: ['largest', 'smallest'],
    optionForKey: [
      {
        table: population_density_by_country,
        column: 'aria_km2',
        largest: 'Which country is the largest by total area?',
        smallest: 'Which country is the smallest by total area?',
      },
      {
        table: quality_of_life_index_by_country,
        column: 'traffic_commute_time_index',
        largest: 'Which country has the largest traffic time?',
        smallest: 'Which country has the smallest traffic time?',
      },
    ],
  },
];

const typeTwoTemplateArr = [
  {
    table: Capital,
    column: 'capital',
    template: 'What is the capital of country?',
  },
  {
    table: population_density_by_country,
    column: 'population',
    template: 'How many people live in country?',
  },
  {
    table: Capital,
    column: 'continent',
    template: 'In what continent is country?',
  },
];

// const typeThreeTemplateArr = [
//   {
//     table: 'population_density_by_countries',
//     template: 'Are there more people in X than in Y?',
//     column: 'population',
//     questionAbout: 'population',
//   },
//   {
//     template: 'Is X larger than Y?',
//     column: 'density_pop_km2',
//     questionAbout: 'Area in km',
//   },
//   {
//     template: 'Does X have a higher population density than Y?',
//     column: 'density_pop_km2',
//   },
//   {
//     template:
//       'Is the quality of life in X higher than the quality of life in Y?',
//     column: 'quality_of_life_index',
//     questionAbout: 'Quality of living index',
//   },
//   {
//     template: 'Is the crime rate of X higher than the crime rate in Y?',
//     column: 'crime_index',
//     questionAbout: 'Crime rate index',
//   },
//   {
//     template: 'Are restaurants in X more expensive than restaurants in Y?',
//     column: 'restaurant_price_index',
//     questionAbout: 'Restaurant price index',
//   },
// ];

async function firstTypeQuestionsGenerator() {
  const chooseQuestion =
    firstTypeQuestions[Math.floor(Math.random() * firstTypeQuestions.length)];
  const key = chooseQuestion.key[Math.floor(Math.random() * 2)];
  const chooseKey = Math.floor(
    Math.random() * chooseQuestion.optionForKey.length
  );
  const Table = chooseQuestion.optionForKey[chooseKey].table;
  const column =
    chooseQuestion.optionForKey[chooseKey].column;

  const answers = await Table.findAll({
    order: Sequelize.literal('rand()'),
    limit: 4,
    attributes: ['country', column],
    where: {
      [Op.or]: [
        { [column]: { [Op.ne]: null } },
        { [column]: { [Op.ne]: undefined } },
      ],
    },
  });

  const questionFromFirstType = {};
  let valuesArr = await Promise.all(
    answers.map((country) => country.toJSON())
  );
  let columnsArr = valuesArr.map((data) => data[column]);
  let countriesArr = valuesArr.map((data) => data['country']);

  if (key === 'most' || key === 'largest') {
    const maxVal = Math.max(...columnsArr);
    let maxValIndex;

    if (typeof columnsArr[0] === 'number') {
      maxValIndex = columnsArr.indexOf(maxVal);
    } else {
      maxValIndex = columnsArr.indexOf(String(maxVal));
    }
    questionFromFirstType.answer = valuesArr[maxValIndex].country;
    countriesArr = countriesArr.filter(
      (value) => value !== questionFromFirstType.answer
    );
  } else {
    const minVal = Math.min(...columnsArr);
    let minValIndex;
    if (typeof columnsArr[0] === 'number') {
      minValIndex = columnsArr.indexOf(minVal);
    } else {
      minValIndex = columnsArr.indexOf(String(minVal));
    }
    questionFromFirstType.answer = valuesArr[minValIndex].country;
    countriesArr = countriesArr.filter(
      (value) => value !== questionFromFirstType.answer
    );
  }
  console.log(questionFromFirstType);

  questionFromFirstType.type = 'type_one';
  questionFromFirstType.question =
    chooseQuestion.optionForKey[chooseKey][key];
  questionFromFirstType.questionValues = JSON.stringify(valuesArr);
  questionFromFirstType.optionA = countriesArr.pop();
  questionFromFirstType.optionB = countriesArr.pop();
  questionFromFirstType.optionC = countriesArr.pop();
  questionFromFirstType.parameterA = 'country';
  questionFromFirstType.parameterB = column;
  questionFromFirstType.rating = 0;
  questionFromFirstType.numOfVotes = 0;

  console.log(questionFromFirstType);
  return questionFromFirstType;
}

function secondTypeQuestionsGenerator() {
  const chooseQuestion =
    typeTwoTemplateArr[Math.floor(Math.random() * typeTwoTemplateArr.length)];

  let template = chooseQuestion.template;
  const column = chooseQuestion.column;
  const table = chooseQuestion.table;

  return table
    .findAll({
      order: Sequelize.literal('rand()'),
      limit: 4,
      attributes: ['country', column],
      where: {
        [Op.or]: [
          { [column]: { [Op.ne]: null } },
          { [column]: { [Op.ne]: undefined } },
        ],
      },
    })
    .then((countries) => {
      const secondTypeQuestion = {};
      const valuesArr = countries.map((country) => country.toJSON());

      template = template.replace('country', valuesArr[0].country);

      secondTypeQuestion.type = 'type_Two';
      secondTypeQuestion.question = template;
      secondTypeQuestion.questionValues = JSON.stringify(valuesArr);
      secondTypeQuestion.answer = valuesArr.shift()[column];
      secondTypeQuestion.optionA = valuesArr.pop()[column];
      secondTypeQuestion.optionB = valuesArr.pop()[column];
      secondTypeQuestion.optionC = valuesArr.pop()[column];
      secondTypeQuestion.parameterA = 'country';
      secondTypeQuestion.parameterB = column;
      secondTypeQuestion.rating = 0;
      secondTypeQuestion.numOfVotes = 0;
      console.log(secondTypeQuestion);
      return secondTypeQuestion;
    })
    .catch((err) => console.log(err));
}

// function questionGeneratorTypeThreeFunc() {
//   const chooseQuestion =
//     typeThreeTemplateArr[
//       Math.floor(Math.random() * typeThreeTemplateArr.length)
//     ];
//   const template = chooseQuestion.template;
//   const column = chooseQuestion.column;
//   const table = chooseQuestion.table;

//   return table.findAll({
//     order: Sequelize.literal('rand()'),
//     limit: 2,
//     attributes: ['country', column],
//     where: {
//       [Op.or]: [
//         { [column]: { [Op.ne]: null } },
//         { [column]: { [Op.ne]: undefined } },
//       ],
//     },
//   }).then((countries) => {
//     const thirdTypeQuestion = {};
//     const valuesArr = countries.map((country) => country.toJSON());
//     const columnsArr = valuesArr.map((data) => data[column]);
//     const countriesArr = valuesArr.map((data) => data['country']);
//     const question = template
//       .replace('X', countriesArr[0])
//       .replace('Y', countriesArr[1]);
//     const maxVal = Math.max(...columnsArr);
//     let maxValIndex;

//     if (typeof columnsArr[0] === 'number') {
//       maxValIndex = columnsArr.indexOf(maxVal);
//     } else {
//       maxValIndex = columnsArr.indexOf(String(maxVal));
//     }

//     if (maxValIndex === 0) {
//       thirdTypeQuestion.answer = 'Yes';
//     } else {
//       thirdTypeQuestion.answer = 'No';
//     }

//     thirdTypeQuestion.questionValues = JSON.stringify(valuesArr);
//     thirdTypeQuestion.type = 'type_three';
//     thirdTypeQuestion.question = question;
//     thirdTypeQuestion.optionA = null;
//     thirdTypeQuestion.optionB = null;
//     thirdTypeQuestion.optionC = null;
//     thirdTypeQuestion.questionAbout = chooseQuestion.questionAbout;
//     thirdTypeQuestion.parameterA = 'country';
//     thirdTypeQuestion.parameterB = column;
//     thirdTypeQuestion.rating = 0;
//     thirdTypeQuestion.numOfVotes = 0;

//     return thirdTypeQuestion;
//   });
// }

async function questionGenerator() {
  const randomType = Math.floor(Math.random() * 2) + 1;
  switch (randomType) {
    case 1:
      return await firstTypeQuestionsGenerator();
      break;

    case 2:
      return await secondTypeQuestionsGenerator();
      break;

    // case 3:
    //   return await questionGeneratorTypeThreeFunc();
    //   break;

    default:
      break;
  }
}

module.exports = { questionGenerator };
