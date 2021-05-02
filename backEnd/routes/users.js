const { Router, text } = require('express');
const { hashSync, compare } = require('bcrypt');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const { USERS, addUser } = require('../leaderBoard');
const users = Router();

users.post('/register', async (req, res, next) => {
  try {
    const { user_name, password } = req.body;

    //check if user exists
    const allUsers = await USERS();
    const checkUser = allUsers.find((user) => user_name === user.user_name);
    console.log(allUsers);
    //id user exist, send response
    if (checkUser) {
      return res.status(409).send('user already exists');
    }
    //id user doesnt exist, send the right response
    const hashedPassword = hashSync(password, 10);

    // add user to the Sql:
    let newUser = await addUser(user_name, hashedPassword);
    res.status(200).send('added a new user successfully');
  } catch (err) {
    next(err);
  }
});

users.post('/login', async (req, res, next) => {
  const { user_name, password } = req.body;
  const allUsers = await USERS();
  const user = allUsers.find((entry) => entry.user_name === user_name);

  if (!user) {
    return res.status(404).send('cannot find user');
  }
  try {
    const isPasswordCorrect = await compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(403).send('User or Password incorrect');
    }
    const jsonToken = jwt.sign(
      { user: user_name },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: '10s',
      }
    );
    res.send('login successfully');
  } catch (err) {
    next(err);
  }
});
module.exports = users;
