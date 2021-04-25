const { savedQuestion } = require('./models');

async function saveQuestion(question) {
  try {
    const save = await savedQuestion.create(
      {
        question_name: question.question_name,
        answer_name: question.options[0],
        option1: question.options[1],
        option2: question.options[2],
        option3: question.options[3],
        rate1: 0,
        rate2: 0,
        rate3: 0,
        rate4: 0,
        rate5: 0,
        average_rate: 0,
      },
      {
        fields: [
          'question_name',
          'answer_name',
          'option1',
          'option2',
          'option3',
          'rate1',
          'rate2',
          'rate3',
          'rate4',
          'rate5',
          'average_rate',
        ],
      }
    );
    console.log(save);
    return save;
  } catch (err) {
    console.log(err);
  }
}

async function updateRank(rank, id) {
  try {
    let read = await savedQuestion.findAll({
      where: { id: id },
      attributes: ['rate1', 'rate2', 'rate3', 'rate4', 'rate5', 'average_rate'],
    });
    read = read[0].dataValues;
    switch (rank) {
      case 1:
        let average1 =
          (read.rate1 +
            1 +
            read.rate2 * 2 +
            read.rate3 * 3 +
            read.rate4 * 4 +
            read.rate5 * 5) /
          (read.rate1 + 1 + read.rate2 + read.rate3 + read.rate4 + read.rate5);
        console.log(average1);
        const update1 = await savedQuestion.update(
          { rate1: read.rate1 + 1, average_rate: average1 },
          { where: { id: id } }
        );
        console.log(average1);
        return update1;
        break;
      case 2:
        let average2 =
          (read.rate1 +
            (read.rate2 + 1) * 2 +
            read.rate3 * 3 +
            read.rate4 * 4 +
            read.rate5 * 5) /
          (read.rate1 +
            (read.rate2 + 1) +
            read.rate3 +
            read.rate4 +
            read.rate5);
        const update2 = await savedQuestion.update(
          { rate2: read.rate2 + 1, average_rate: average2 },
          { where: { id: id } }
        );
        return update2;
        break;
      case 3:
        let average3 =
          (read.rate1 +
            read.rate2 * 2 +
            (read.rate3 + 1) * 3 +
            read.rate4 * 4 +
            read.rate5 * 5) /
          (read.rate1 +
            read.rate2 +
            (read.rate3 + 1) +
            read.rate4 +
            read.rate5);
        const update3 = await savedQuestion.update(
          { rate3: read.rate3 + 1, average_rate: average3 },
          { where: { id: id } }
        );
        return update3;
        break;
      case 4:
        let average4 =
          (read.rate1 +
            read.rate2 * 2 +
            read.rate3 * 3 +
            (read.rate4 + 1) * 4 +
            read.rate5 * 5) /
          (read.rate1 +
            read.rate2 +
            read.rate3 +
            (read.rate4 + 1) +
            read.rate5);
        const update4 = await savedQuestion.update(
          { rate4: read.rate4 + 1, average_rate: average4 },
          { where: { id: id } }
        );
        return update4;
        break;
      case 5:
        let average5 =
          (read.rate1 +
            read.rate2 * 2 +
            read.rate3 * 3 +
            read.rate4 * 4 +
            (read.rate5 + 1) * 5) /
          (read.rate1 +
            read.rate2 +
            read.rate3 +
            read.rate4 +
            (read.rate5 + 1));
        const update5 = await savedQuestion.update(
          { rate5: read.rate5 + 1, average_rate: average5 },
          { where: { id: id } }
        );
        return update5;
        break;
    }
  } catch (error) {
    console.log(error);
  }
}
function GetSavedQuestion() {
  return savedQuestion.findAll({
    attributes: [
      'question_name',
      'answer_name',
      'option1',
      'option2',
      'option3',
    ],
  });
}

module.exports = { saveQuestion, updateRank, GetSavedQuestion };
