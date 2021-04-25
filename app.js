const express = require('express');
const cors = require('cors');
const app = express();
const { questionGenerator } = require('./backEnd/query');
const { saveQuestion } = require('./backEnd/updateTable');
app.use(cors());
app.use(express.json());

const questionAndAnswer = (question) => {
  let values = [
    question.answer,
    question.optionA,
    question.optionB,
    question.optionC,
  ];
  let totalQuestion = { question: question.question, options: values };
  return totalQuestion;
};
app.get('/questions', async (req, res) => {
  try {
    let question = await questionGenerator();
    console.log(question);
    res.status(200).json(questionAndAnswer(question));
  } catch (err) {
    res.status(500).send(err);
  }
});
app.post('/savequestions', async (req, res) => {
  try {
    let save = req.body;
    console.log(save);
    let addToSave = await saveQuestion(save);
    console.log(addToSave);
    res.status(200).send('added successfully');
  } catch (err) {
    res.status(500).send(err);
  }
});
const PORT = process.env.PORT || 3001;

app.listen(PORT, () =>
  console.log(`app listening at http://localhost:${PORT}`)
);
