const { savedQuestion } = require('./models');

async function saveQuestion(question) {
  try {
    const save = await savedQuestion.create(
      {
        question_name: question.question,
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
module.exports = { saveQuestion };
