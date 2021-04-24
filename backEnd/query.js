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

const typeOneTemplateArr = [
  {
    keyWord: ['most', 'least'],
    optionForKeyWord: [
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
  keyWord: ['largest', 'smallest'],
  optionForKeyWord: [
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

async function questionGeneratorTypeOneFunc() {
  const questionTemplate =
    typeOneTemplateArr[Math.floor(Math.random() * typeOneTemplateArr.length)];
  const keyWord = questionTemplate.keyWord[Math.floor(Math.random() * 2)];
  const optionForKeyWordIndex = Math.floor(
    Math.random() * questionTemplate.optionForKeyWord.length
  );
  const Table = questionTemplate.optionForKeyWord[optionForKeyWordIndex].table;
  const column =
    questionTemplate.optionForKeyWord[optionForKeyWordIndex].column;

  const allTable = await Table.findAll({
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

  //   console.log(countries);

  const typeOneQuestionObj = {};
  let valuesArr = await Promise.all(
    allTable.map((country) => country.toJSON())
  );
  let columnsVals = valuesArr.map((data) => data[column]);
  let countryVals = valuesArr.map((data) => data['country']);
  console.log(columnsVals);
  if (keyWord === 'most' || keyWord === 'largest') {
    const maxVal = Math.max(...columnsVals);
    let maxValIndex;

    if (typeof columnsVals[0] === 'number') {
      maxValIndex = columnsVals.indexOf(maxVal);
    } else {
      maxValIndex = columnsVals.indexOf(String(maxVal));
    }
    typeOneQuestionObj.answer = valuesArr[maxValIndex].country;
    countryVals = countryVals.filter(
      (value) => value !== typeOneQuestionObj.answer
    );
  } else {
    const minVal = Math.min(...columnsVals);
    let minValIndex;
    if (typeof columnsVals[0] === 'number') {
      minValIndex = columnsVals.indexOf(minVal);
    } else {
      minValIndex = columnsVals.indexOf(String(minVal));
    }
    typeOneQuestionObj.answer = valuesArr[minValIndex].country;
    countryVals = countryVals.filter(
      (value) => value !== typeOneQuestionObj.answer
    );
  }
  console.log(typeOneQuestionObj);

  typeOneQuestionObj.type = 'type_one';
  typeOneQuestionObj.question =
    questionTemplate.optionForKeyWord[optionForKeyWordIndex][keyWord];
  typeOneQuestionObj.questionValues = JSON.stringify(valuesArr);
  typeOneQuestionObj.optionA = countryVals.pop();
  typeOneQuestionObj.optionB = countryVals.pop();
  typeOneQuestionObj.optionC = countryVals.pop();
  typeOneQuestionObj.parameterA = 'country';
  typeOneQuestionObj.parameterB = column;
  typeOneQuestionObj.rating = 0;
  typeOneQuestionObj.numOfVotes = 0;

  console.log(typeOneQuestionObj);
  return typeOneQuestionObj;
}

function questionGeneratorTypeTwoFunc() {
  const questionTemplate =
    typeTwoTemplateArr[Math.floor(Math.random() * typeTwoTemplateArr.length)];

  const column = questionTemplate.column;
  const table = questionTemplate.table;
  let template = questionTemplate.template;

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
      const typeTwoQuestionObj = {};
      const valuesArr = countries.map((country) => country.toJSON());

      template = template.replace('country', valuesArr[0].country);

      typeTwoQuestionObj.type = 'type_Two';
      typeTwoQuestionObj.question = template;
      typeTwoQuestionObj.questionValues = JSON.stringify(valuesArr);
      typeTwoQuestionObj.answer = valuesArr.shift()[column];
      typeTwoQuestionObj.optionA = valuesArr.pop()[column];
      typeTwoQuestionObj.optionB = valuesArr.pop()[column];
      typeTwoQuestionObj.optionC = valuesArr.pop()[column];
      typeTwoQuestionObj.parameterA = 'country';
      typeTwoQuestionObj.parameterB = column;
      typeTwoQuestionObj.rating = 0;
      typeTwoQuestionObj.numOfVotes = 0;

      return typeTwoQuestionObj;
    })
    .catch((err) => console.log(err));
}

function questionGeneratorTypeThreeFunc() {
  const questionObj =
    typeThreeTemplateArr[
      Math.floor(Math.random() * typeThreeTemplateArr.length)
    ];
  const template = questionObj.template;
  const column = questionObj.column;

  return CountriesTable.findAll({
    order: Sequelize.literal('rand()'),
    limit: 2,
    attributes: ['country', column],
    where: {
      [Op.or]: [
        { [column]: { [Op.ne]: null } },
        { [column]: { [Op.ne]: undefined } },
      ],
    },
  }).then((countries) => {
    const typeThreeQuestionObj = {};
    const valuesArr = countries.map((country) => country.toJSON());
    const columnsVals = valuesArr.map((data) => data[column]);
    const countryVals = valuesArr.map((data) => data['country']);
    const question = template
      .replace('X', countryVals[0])
      .replace('Y', countryVals[1]);
    const maxVal = Math.max(...columnsVals);
    let maxValIndex;

    if (typeof columnsVals[0] === 'number') {
      maxValIndex = columnsVals.indexOf(maxVal);
    } else {
      maxValIndex = columnsVals.indexOf(String(maxVal));
    }

    if (maxValIndex === 0) {
      typeThreeQuestionObj.answer = 'Yes';
    } else {
      typeThreeQuestionObj.answer = 'No';
    }

    typeThreeQuestionObj.questionValues = JSON.stringify(valuesArr);
    typeThreeQuestionObj.type = 'type_three';
    typeThreeQuestionObj.question = question;
    typeThreeQuestionObj.optionA = null;
    typeThreeQuestionObj.optionB = null;
    typeThreeQuestionObj.optionC = null;
    typeThreeQuestionObj.questionAbout = questionObj.questionAbout;
    typeThreeQuestionObj.parameterA = 'country';
    typeThreeQuestionObj.parameterB = column;
    typeThreeQuestionObj.rating = 0;
    typeThreeQuestionObj.numOfVotes = 0;

    return typeThreeQuestionObj;
  });
}

async function questionGenerator() {
  const randomType = Math.floor(Math.random() * 3) + 1;
  switch (randomType) {
    case 1:
      return await questionGeneratorTypeOneFunc();
      break;

    case 2:
      return await questionGeneratorTypeTwoFunc();
      break;

    case 3:
      return await questionGeneratorTypeThreeFunc();
      break;

    default:
      break;
  }
}

// (async function a() {
//   Question.create(await questionGenerator());
// })();
console.log(questionGeneratorTypeOneFunc());
module.exports = { questionGenerator };
