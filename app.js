const express = require('express');
const cors = require('cors');
const app = express();
const { questionGenerator } = require('./backEnd/query');
const {
  saveQuestion,
  updateRank,
  GetSavedQuestion,
} = require('./backEnd/updateTable');
const { showBoard, addUser } = require('./backEnd/leaderBoard');
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
app.get('/leaderboard', async (req, res) => {
  try {
    let users = await showBoard();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post('/user', async (req, res) => {
  try {
    let user = req.body;
    let newUser = await addUser(user.user_name, user.score);
    res.status(200).send('added a new user successfully');
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
const PORT = process.env.PORT || 3001;

app.listen(PORT, () =>
  console.log(`app listening at http://localhost:${PORT}`)
);
