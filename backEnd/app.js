const express = require('express');
const cors = require('cors');
const app = express();
const { questionGenerator } = require('./query');
const users = require('./routes/users.js');
const morgan = require('morgan');
const { saveQuestion, updateRank, GetSavedQuestion } = require('./updateTable');
const { showBoard, addScore } = require('./leaderBoard');
app.use(cors());
app.use(express.json());
app.use('/users', users);
app.use(morgan('tiny'));

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
app.get('/leaderboard', async (req, res) => {
  try {
    let user = await showBoard();
    console.log(user);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).send(err);
  }
});
app.put('/addscore', async (req, res) => {
  try {
    let score = req.body;
    let update = await addScore(score.user_name, score.score);
    console.log(update);
    res.status(200).send('update successfully');
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
app.put('/rank', async (req, res) => {
  try {
    let rank = req.body;
    console.log(rank.rank);
    console.log(rank.id);
    let update = await updateRank(rank.rank, rank.id);
    console.log(update);
    res.status(200).send('update successfully');
  } catch (err) {
    res.status(500).send(err);
  }
});
app.get('/saved', async (req, res) => {
  try {
    let questions = await GetSavedQuestion();
    res.status(200).json(questions);
  } catch (err) {
    res.status(500).send(err);
  }
});

const errorHandler = (error, req, res, next) => {
  console.error(error);
  console.error(error.message);

  next(error);
};
app.use(errorHandler);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () =>
  console.log(`app listening at http://localhost:${PORT}`)
);
